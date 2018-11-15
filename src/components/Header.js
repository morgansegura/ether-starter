import React, { Component } from 'react';

// Components
import Navigation from './Navigation';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <Navigation />
                    </div>                
                </div>
            </header>
        );
    }
}

export default Header;