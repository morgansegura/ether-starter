
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export default class ShopPage extends Component {
  render() {
    const { data } = this.props
    console.log(data)
    const { edges: posts } = data.allMarkdownRemark
    const mainImage = posts.mainImage

    return (
      <Layout>
        <section className="section product">
          <div className="container">
            <div className="content">
              <h1 className="t-center">Latest Stories</h1>
            </div>
            <div className="row">
            {posts
              .map(({ node: post }) => (
                  <Link key={post.id} className="col-6 col-md-4 col-ld-3" to={post.fields.slug}>
                    <PreviewCompatibleImage imageInfo={post.frontmatter.mainImage} />                    
                    <p className="t-center b6 mt-5 mb-20">{post.frontmatter.title}</p>
                  </Link>
              ))}
            </div>      
          </div>
        </section>
      </Layout>
    )
  }
}

ShopPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export const pageQuery = graphql`
  query ShopQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "shop-item" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            price
            inStock
            discount          
            mainImage {
              image {
                childImageSharp {
                  fluid(maxWidth: 500, quality: 92) {
                    ...GatsbyImageSharpFluid
                  }
                }            
              }
              alt
            }            
          }
        }
      }
    }
  }
`
