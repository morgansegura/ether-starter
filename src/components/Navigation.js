import React from 'react'
import { Link } from 'gatsby'

const Navbar = () => (
  <nav className="nav">
    <div className="container">
      <div className="nav__inner">
        <Link className="nav__item" to="/blog" title="Internal page.">
          Blog
        </Link>
      </div>
    </div>
  </nav>
)

export default Navbar
