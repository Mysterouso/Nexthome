import React from 'react';

const Checkbox = () =>{

    return(
    //     <div>
    //     <label className="checkbox-container">
    //         <input type="checkbox"/>
    //         <span>Buy</span>
    //     </label>
    //     <label className="checkbox-container">
    //         <input type="checkbox"/>
    //         <span>Rent</span>
    //     </label>
    // </div>
     
    <div className="login-divider">

        <div className="login-partition">
        <input type="checkbox"/>
            {/* <input checked={this.state.isLogin} onChange={this.handleCheck}type="checkbox"/> */}
            <div>
                <h3>Login</h3>
            </div>
        </div>

        <div className="login-partition login-partition-register">
        <input type="checkbox"/>
            {/* <input checked={this.state.isRegister} onChange={this.handleCheck} type="checkbox"/> */}
            <div>
                <h3>Register</h3>
            </div>
        </div>
        
    </div>

    )
}

export default Checkbox