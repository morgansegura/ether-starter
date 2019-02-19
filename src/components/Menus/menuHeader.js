// import { Link } from 'gatsby'
import PropTypes from 'prop-types'
// import PreviewCompatibleImage from '../PreviewCompatibleImage'
import { StaticQuery, graphql } from 'gatsby'
import CustomLink from '../CustomLink'
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
        headerMenu: allMarkdownRemark(
          filter: {
            frontmatter: { menuHeader: { mainMenu: { label: { ne: null } } } }
          }
        ) {
          edges {
            node {
              frontmatter {
                menuHeader {
                  mainMenu {
                    label
                    linkURL
                    linkType
                  }
                }
              }
            }
          }
        }
        accountHeaderMenu: allMarkdownRemark(
          filter: {
            frontmatter: {
              menuHeader: { accountMenu: { label: { ne: null } } }
            }
          }
        ) {
          edges {
            node {
              frontmatter {
                menuHeader {
                  accountMenu {
                    label
                    linkURL
                    linkType
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const menuMain = data.headerMenu.edges
      console.log(menuMain)
      return (
        <>
          <nav id="navHeader" className="nav__header col-12 col-md-10">
            <div className="nav__header__inner row">
              {!!menuMain ? (
                <>
                  <div className="nav__primary col-12 col-md-9">
                    {menuMain.map((item, i) => {
                      item = item.node.frontmatter.menuHeader.mainMenu
                      return (
                        <CustomLink
                          key={i}
                          linkType={item.linkType}
                          linkURL={item.linkURL}
                          className="hello"
                        >
                          {item.label}
                        </CustomLink>
                      )
                    })}
                  </div>
                  <div className="nav__secondary col-12 col-md-3" />
                </>
              ) : null}
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
