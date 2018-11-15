import React, { Component } from 'react';

// Components
import Navigation from './Navigation';

class Header extends Component {
    render() {
        return (
            <header>
                <p>The header belongs here.</p>
                <Navigation />
            </header>
        );
    }
}

export default Header;