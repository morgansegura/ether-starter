const _ = require('lodash')
const Promise = require(`bluebird`)
const path = require(`path`)
const get = require('lodash/get')
const { createFilePath } = require('gatsby-source-filesystem')

const { fmImagesToRelative } = require('gatsby-remark-relative-images')
// const { paginate } = require('gatsby-awesome-pagination')

exports.createPages = ({ actions, graphql }) => {
  const { createPage, deletePage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const excludeArray = ['settings']
    const postOrPage = result.data.allMarkdownRemark.edges.filter((edge, i) => {
      if (edge.node.frontmatter.templateKey === excludeArray[i]) {
        return false
      } else {
        // return !Boolean(edge.node.fields.slug.match(/^\/settings\/.*$/));
        return edge
      }
    })

    postOrPage.forEach(edge => {
      let component, pathName, tags

      if (edge.node.frontmatter.templateKey === 'home-page') {
        pathName = '/'
        component = path.resolve(`src/pages/index.js`)
      } else if (edge.node.frontmatter.templateKey === 'page') {
        pathName = edge.node.fields.slug.replace('/page/', '/')
        component = path.resolve(`src/templates/page.js`)
      } else {
        pathName = edge.node.fields.slug
        component = path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        )

        if (edge.node.frontmatter.templateKey === `post`) {
          tags = edge.node.frontmatter.tags
        }
      }

      const id = edge.node.id

      createPage({
        path: pathName,
        component,
        tags: tags,
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    postOrPage.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  cache,
  store,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions

  let fileNode

  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: { fs: 'empty' },
  })
}
