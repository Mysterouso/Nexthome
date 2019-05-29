import React from 'react';
import { NavLink } from "react-router-dom";
import { Usercontext } from '../../Context/Usercontext'
import { fetchServer,defaultUser } from '../../Utils/Util' 
import './Navigation.css'


const Navigation = (props) => {

    const {user,updateUser,redirectLogin} = React.useContext(Usercontext);

    const handleLogout = (e) => {
        fetchServer('/logout',null,'GET')
        .then(resp=>{
            if(resp.loggedOut){
                redirectLogin(false);
                updateUser(defaultUser);
            }
        })
    }
    

    return(
    <React.Fragment>
        <div className="nav">
            <h1 className="nav-brand">NextHome</h1>
            <ul className="nav-list">
                    <li className="nav-item">Welcome {user.name ? user.name : ''} </li>
                <NavLink to='/'>
                    <li className="nav-item">Home</li>
                </NavLink>
                { user.name ? (
                    <NavLink onClick={handleLogout} to='/login'>
                    <li className="nav-item">Logout</li>
                    </NavLink>
                    )  :  (
                    <NavLink to='/login'>
                        <li className="nav-item">Login</li>
                    </NavLink>
                    )
                }
            </ul>
        </div>
    </React.Fragment>
    )
}

export default Navigation;