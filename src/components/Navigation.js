import React from 'react'
import { Link } from 'gatsby'

const Navbar = () => (
  <nav className="nav nav__main">
    <div className="container">
      <div className="nav__inner">
        <Link className="nav__item" to="/shop" title="Internal page.">
          Shop
        </Link>
        <Link className="nav__item" to="/pricing" title="Internal page.">
          Pricing
        </Link>
        <Link className="nav__item" to="/about" title="Internal page.">
          About
        </Link>
        <Link className="nav__item" to="/contact" title="Internal page.">
          Contact
        </Link>
        <Link className="nav__item" to="/blog" title="Internal page.">
          Blog
        </Link>        
      </div>
    </div>
  </nav>
)

export default Navbar
