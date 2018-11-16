import React, { Component } from 'react';
import { Link } from 'gatsby';
// Components
import Navigation from './Navigation';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <Link className="logo" to="/">Logo</Link>
                        <Navigation />
                    </div>                
                </div>
            </header>
        );
    }
}

export default Header;