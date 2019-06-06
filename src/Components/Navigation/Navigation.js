import React from 'react';
import { NavLink } from "react-router-dom";
import { Usercontext } from '../../Context/Usercontext'
import { fetchServer,defaultUser } from '../../Utils/Util' 
import { withRouter } from "react-router";

import './Navigation.css'


const Navigation = (props) => {

    const {user,updateUser,updateRefresh,redirectLogin} = React.useContext(Usercontext);

    const handleLogout = (e) => {
        fetchServer('/logout',null,'GET')
        .then(resp=>{
            if(resp.loggedOut){
                redirectLogin(false);
                updateUser(defaultUser);
                updateRefresh(true)
                props.history.push('/login')
            }
        })
    }
    

    return(
    <React.Fragment>
        <div className="nav">
            <h1 className="nav-brand">NextGame</h1>
            <div className="nav-menu">
                <h4 className="nav-item greeting">Welcome {user.name ? user.name : ''} </h4>
                <ul className="nav-list">
                    <NavLink exact activeClassName="nav-link-active" className="nav-link" to='/'>
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
        </div>
    </React.Fragment>
    )
}

export default withRouter(Navigation);