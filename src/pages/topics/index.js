import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const TopicsPage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { title } } },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Topics | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="title is-size-2 is-bold-light">Topics</h1>
            <ul className="taglist">
              {group.map(topic => (
                <li key={topic.fieldValue}>
                  <Link to={`/topics/${kebabCase(topic.fieldValue)}/`}>
                    {topic.fieldValue} ({topic.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default TopicsPage

export const topicPageQuery = graphql`
  query TopicsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___topics) {
        fieldValue
        totalCount
      }
    }
  }
`
