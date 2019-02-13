import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <header id="headerMain" className="header unfill">
    <div className="header__inner container">
      <div className="row align-items-center">
        <div className="header__branding col-12 col-md">
          <Link to="/">Logo Image</Link>
        </div>

        <nav id="navHeader" className="nav__header col-12 col-md-10">
          <div className="nav__header__inner row">
            <div className="" />
          </div>

          <div className="nav__header__trigger">
            <div className="nav__header__trigger--inner" />
          </div>
        </nav>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
