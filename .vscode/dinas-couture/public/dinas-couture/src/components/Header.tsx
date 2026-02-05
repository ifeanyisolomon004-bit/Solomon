import React from 'react';
import Navigation from './Navigation';

const Header: React.FC = () => {
    return (
        <header>
            <div className="logo">
                <h1>Dinas Couture</h1>
            </div>
            <Navigation />
        </header>
    );
};

export default Header;