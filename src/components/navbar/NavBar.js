import React from 'react';

const navStyle = {
    color: '#00d2d3'
};

const NavBar = () => (
    <div class="sidebar-header">
        <nav className="navbar navbar-dark bg-dark">
            <h3 style={navStyle}>GIPHY Search</h3>
        </nav>
    </div>
);

export { NavBar };