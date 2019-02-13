import React from 'react'

export default function Footer() {
  return (
    <footer id="footerMain" className="footer">
      <div class="container">
        <div class="footer__segment footer__info">
          &copy; {new Date().getFullYear()}, Built with {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </div>
    </footer>
  )
}
