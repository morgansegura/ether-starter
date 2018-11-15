import React from 'react'
import { Link } from 'gatsby'

const Navbar = () => (
  <nav className="nav">
    <div className="container">
      <div className="nav__inner">
        <Link className="nav__item" to="/" title="Internal page.">
          Internal Page
        </Link>
      </div>
    </div>
  </nav>
)

export default Navbar
