import React from 'react';

// Components
import Navigation from './Navigation'

const Footer = () => {

    const copyrightYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container ">
                <div className="footer__inner">
                    <p className="copyright">
                        <span className="year">&copy; {copyrightYear}.</span> 
                        <span className="company">Company Name</span>
                    </p>
                    <Navigation />
                </div>            
            </div>
        </footer>
    );
};

export default Footer;
