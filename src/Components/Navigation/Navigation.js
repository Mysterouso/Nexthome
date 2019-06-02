import React from 'react';
import { NavLink } from "react-router-dom";
import { Usercontext } from '../../Context/Usercontext'
import { fetchServer,defaultUser } from '../../Utils/Util' 
import { withRouter } from "react-router";

import './Navigation.css'


const Navigation = (props) => {

    const {user,updateUser,redirectLogin} = React.useContext(Usercontext);

    const handleLogout = (e) => {
        fetchServer('/logout',null,'GET')
        .then(resp=>{
            if(resp.loggedOut){
                redirectLogin(false);
                updateUser(defaultUser);
                props.history.push('/login')
            }
        })
    }
    

    return(
    <React.Fragment>
        <div className="nav">
            <h1 className="nav-brand">NextHome</h1>
            <ul className="nav-list">
                    <li className="nav-item greeting">Welcome {user.name ? user.name : ''} </li>
                <NavLink className="nav-link" to='/'>
                    <li className="nav-item two">Home</li>
                </NavLink>
                { user.name ? (
                    <NavLink className="nav-link" onClick={handleLogout} to='/login'>
                    <li className="nav-item">Logout</li>
                    </NavLink>
                    )  :  (
                    <NavLink className="nav-link" to='/login'>
                        <li className="nav-item three">Login</li>
                    </NavLink>
                    )
                }
            </ul>
        </div>
    </React.Fragment>
    )
}

export default withRouter(Navigation);