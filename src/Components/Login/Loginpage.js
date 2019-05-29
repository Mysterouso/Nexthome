import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Usercontext } from '../../Context/Usercontext'

import Loginpageform from './Loginpageform'

import { fetchServer } from '../../Utils/Util';

import './Loginpage.css';

const initialErrorState = {
    email:{
        isError: false,
        errorMessage:'',
    },
    password:{
        isError: false,
        errorMessage:'Passwords don\'t match',
    }
}

class Loginpage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            name: '',
            repeatPassword: '',
            error: initialErrorState,
            isLogin: true,
            isRegister: false
        }
    }

    handleSubmit = (e) =>{
        //Still need to handle when email is already in the database
        e.preventDefault()

        this.setState({error:initialErrorState})

        let body;
        let path;
        const { user,updateUser, redirectLogin} = this.context;

        if(this.state.isLogin){
            body = JSON.stringify({
                email:this.state.email,
                password:this.state.password
            })
            path='/signin'
        }
        else{
            if(this.state.password !== this.state.repeatPassword){
                this.setState((prevState)=>{
                   return({
                            error:{...prevState.error,
                                password:{
                                    isError:true,
                                    errorMessage:"Passwords don't match"
                                }
                            }
                        })
                })
                return;
            }

            body = JSON.stringify({
                name: this.state.name,
                email:this.state.email,
                password:this.state.password
            })
            path='/register'
        }
        fetchServer(path,body,'POST')
        .then(res=>{updateUser(res.user);return res})
        .then(resp=>console.log(resp))
        .then(item=>redirectLogin(true))
        .catch(err=>console.log(err))
        
    }




    handleInput = (e) =>{
        const {name,value} = e.target
        this.setState({[name]: value})
    }

    handleCheck = (e) =>{
        
        if(!e.target.checked)return;
        
        this.setState((prevState)=>{
            
            return{
                email: '',
                password: '',
                name: '',
                repeatPassword: '',
                error: initialErrorState,
                isLogin:!prevState.isLogin,
                isRegister:!prevState.isRegister
            }
        })
    }



    render(){
        const {email,password} = this.state.error;
        

        return(<div className="login-page">
                    <div className="login">
                        <div className="login-body login--active">
                        
                        <div className="login-divider">
                                <div className="login-partition">
                                    <input checked={this.state.isLogin} onChange={this.handleCheck}type="checkbox"/>
                                    <div>
                                        <h3>Login</h3>
                                    </div>
                                </div>
                                <div className="login-partition login-partition-register">
                                    <input checked={this.state.isRegister} onChange={this.handleCheck} type="checkbox"/>
                                    <div>
                                        <h3>Register</h3>
                                    </div>
                                </div>
                                
                        </div>


                            
                            <form onSubmit={this.handleSubmit}>
                                
                                {this.state.isRegister && (
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input onChange={this.handleInput} value={this.state.name} type="name" name="name"></input>
                                    </div>
                                    )}

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input onChange={this.handleInput} value={this.state.email} type="email" name="email"></input>
                                    {email.isError && 
                                    <span className="error-message">{email.errorMessage}</span>
                                    }
                                </div>

                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input onChange={this.handleInput} value={this.state.password} type="password" name="password"></input>
                                    {password.isError &&
                                    <span className="error-message">Passwords don't match</span>
                                    }
                                </div>

                                {this.state.isRegister && (
                                    <div>
                                        <label htmlFor="repeatPassword">Confirm your password</label>
                                        <input onChange={this.handleInput} value={this.state.repeatPassword} type="password" name="repeatPassword"></input>
                                    </div>
                                    )}

                                <input type="submit"></input>
                            </form>
                            <div className="login-options">
                                <div className="login-to-register">
                                    <h6>Don't have an account?</h6>
                                    <Link to="/register">
                                        <h6>Register here</h6>
                                    </Link>
                                </div>
                                <div className="login-to-home">
                                    <h6>Don't want an account?</h6>
                                    <Link to="/">
                                        <h6>Proceed from here</h6>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
              </div>)
    }
}

Loginpage.contextType = Usercontext;


export default Loginpage;