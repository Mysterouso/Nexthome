import React from 'react';
import './Navigation.css'

const Navigation = () => {
    return(
        <div className="nav">
            <h1 className="nav-brand">NextHome</h1>
            <ul className="nav-list">
                <li className="nav-item"><a href="http://google.com">Home</a></li>
                <li className="nav-item"><a href="http://google.com">Search</a></li>
                <li className="nav-item"><a href="http://google.com">Login</a></li>
            </ul>
        </div>
    )
}

export default Navigation;