import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
// import Helmet from "react-helmet"
import Layout from '../components/layout'
// import SEO from "../components/SEO"
import SplashPageTemplate from '../templates/splash-page'
import HomePageTemplate from '../templates/home-page'

export default class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSplashPage: false,
    }
  }
  componentDidMount() {}
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <React.Fragment>
        {this.state.showSplashPage === true ? (
          <SplashPageTemplate />
        ) : (
          <Layout>
            <HomePageTemplate data={posts} />
          </Layout>
        )}
      </React.Fragment>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "home" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
