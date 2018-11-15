import React from 'react';
import Helmet from 'react-helmet';
// Components
import Header from './Header';
import Footer from './Footer';
// Media
import '../assets/css/styles.css'

const TemplateWrapper = ({ children }) => (
  <div className="wrapper">
    <Helmet 
      title={`Ether Starter`}
    />
    <Header />
    <main className="main">
      {children}
    </main>
    <Footer />
  </div>
)

export default TemplateWrapper;
