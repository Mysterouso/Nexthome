import React from 'react';
import './Navigation.css'
import { NavLink } from "react-router-dom";


const Navigation = ({children}) => {
    return(
    <React.Fragment>
        <div className="nav">
            <h1 className="nav-brand">NextHome</h1>
            <ul className="nav-list">
                <NavLink to='/'>
                    <li className="nav-item">Home</li>
                </NavLink>
                <NavLink to='/search'>
                    <li className="nav-item">Search</li>
                </NavLink>
                <NavLink to='/login'>
                    <li className="nav-item">Login</li>
                </NavLink>
            </ul>
        </div>
        {children}
    </React.Fragment>
    )
}

export default Navigation;