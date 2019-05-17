import React from 'react';
import './Navigation.css'
import { BrowserRouter as Router, NavLink } from "react-router-dom";


const Navigation = () => {
    return(
        <div className="nav">
            <h1 className="nav-brand">NextHome</h1>
            <ul className="nav-list">
            <Router>
                <NavLink to='/'>
                    <li className="nav-item">Home</li>
                </NavLink>
                <NavLink to='/search'>
                    <li className="nav-item">Search</li>
                </NavLink>
                <NavLink to='/login'>
                    <li className="nav-item">Login</li>
                </NavLink>
            </Router>
            </ul>
        </div>
    )
}

export default Navigation;