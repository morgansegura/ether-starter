// import { Link } from 'gatsby'
import PropTypes from 'prop-types'
// import PreviewCompatibleImage from '../PreviewCompatibleImage'
import { StaticQuery, graphql } from 'gatsby'
// import CustomLink from './CustomLink'
import React from 'react'
import { toggleMobileNav } from '../../helpers/helpers'

const MenuHeader = ({ siteTitle }) => (
  <StaticQuery
    query={graphql`
      query MenuHeaderQuery {
        site {
          siteMetadata {
            title
          }
        }
        getLogo: allMarkdownRemark(
          filter: { frontmatter: { logoImage: { image: { ne: null } } } }
        ) {
          edges {
            node {
              frontmatter {
                logoImage {
                  image
                  alt
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { logoImage: logo } = data.getLogo.edges[0].node.frontmatter
      return (
        <>
          <nav id="navHeader" className="nav__header col-12 col-md-10">
            <div className="nav__header__inner row">
              <div className="nav__primary col-12 col-md-9" />
              <div className="nav__primary col-12 col-md-3" />
            </div>

            <div className="nav__header__trigger" onClick={toggleMobileNav}>
              <div className="nav__header__trigger--inner" />
            </div>
          </nav>
        </>
      )
    }}
  />
)

MenuHeader.propTypes = {
  siteTitle: PropTypes.string,
}

MenuHeader.defaultProps = {
  siteTitle: ``,
}

export default MenuHeader
