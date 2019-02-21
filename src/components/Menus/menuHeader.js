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
            frontmatter: {
              menuHeader: { mainMenu: { uniqueID: { ne: null } } }
            }
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
              menuHeader: { accountMenu: { uniqueID: { ne: null } } }
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
                    icon
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
      const menuAccount = data.accountHeaderMenu.edges
      //   console.log(menuMain)
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
                          className="nav__item"
                        >
                          {item.label}
                        </CustomLink>
                      )
                    })}
                  </div>
                  <div className="nav__secondary col-12 col-md-3">
                    {menuAccount.map((item, i) => {
                      item = item.node.frontmatter.menuHeader.accountMenu
                      return (
                        <CustomLink
                          key={i}
                          linkType={item.linkType}
                          linkURL={item.linkURL}
                          className="nav__item"
                        >
                          {!!item.icon && item.icon !== '' ? (
                            <span className="iconify" data-icon={item.icon} />
                          ) : (
                            item.label
                          )}
                        </CustomLink>
                      )
                    })}
                  </div>
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
