import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

// console.log(Icon)

import Header from './header'
import Footer from './footer'

import '../assets/styles.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          <script src="//code.iconify.design/1/1.0.0-rc7/iconify.min.js" />
        </Helmet>
        <div
          id="wrapperMain"
          className="wrapper is--mobile-nav mobile-nav--is-closed"
        >
          <Header siteTitle={data.site.siteMetadata.title} />
          <main id="contentMain" className="main">
            {children}
          </main>
          <Footer />
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
