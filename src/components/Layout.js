import React from 'react'
import Helmet from 'react-helmet'

const TemplateWrapper = ({ children, data }) => (
  <div className="wrapper">
    <Helmet 
      title={`${data.site.siteMetadata.title} | Customize this site!`}
    />
    <Header />
    <main className="main">
      {children}
    </main>
    <Footer />
  </div>
)

export default TemplateWrapper

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`