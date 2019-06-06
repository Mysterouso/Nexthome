import React from 'react';
import { Route,Switch,Redirect } from "react-router-dom";
import { Usercontext } from './Context/Usercontext';
import { fetchServer,defaultUser } from './Utils/Util'

import Viewbox from './Pages/Searchpage/Viewbox'
import Productpage from './Pages/Productpage/Productpage'
import Loginpage from './Pages/Login/Loginpage'

import Errorboundary from './Components/Errorboundary';
import Navigation from './Components/Navigation/Navigation'
import Products from './Components/Products/Products'

import './App.css';

class App extends React.Component{

  constructor(){
    super();
    this.state={
      products:[],
      isLoggedIn:false,
      showNav:true,
      searchField:"",
      user: defaultUser,
      shouldRefresh:false
    }
  }

  componentDidMount(){
    fetchServer('/session',null,'GET')
    .then(item=>{
      if(item.isLoggedIn){
        this.updateUser(item.user);
        this.redirectLogin(true);
      }
    })
  }

  redirectLogin = (value) => {
    this.setState({isLoggedIn:value})
  }

  updateUser = (userObj) => {
    this.setState({user:userObj})
  }

  updateSearch = (e) => {
    this.setState({searchField:e.target.value})
  }

  handleFetch = (purpose='search',slug='') => {

    let body = JSON.stringify({search:this.state.searchField});

    if(purpose==="get") body = JSON.stringify({slug});
    
   return fetch("http://localhost:5000",{
      method:"POST",
      body,
      headers:{ "Content-Type": "application/json"}
    })
     
  }
    
  fetchSearch = (e) => {
    e.preventDefault()
     this.handleFetch()
     .then(res=>res.json())
    .then(products => this.setState({products}))
    .catch(err => {
        console.error(err);
    });
  }

  getProduct = (slug) => {
    return (
    this.handleFetch('get',slug)
    .then(res=>{
      if(!res.ok){
        throw new Error('Please enter a valid name')
      } 
      else{
        return res.json()
      }
    })
    .catch(err => {
      console.error(err);
  })
    )
  }

  filterProductBySlug = (arr,slug) => {
    return arr.filter(product=>product.slug===slug)
    
  }
  
  monitorNav = (newState) => {
    this.setState({showNav:newState})
  }

  updateRefresh = (newState) =>{
    this.setState({shouldRefresh:newState})
  }

  updateProducts = (newState) =>{
    this.setState({products:newState})
  }

    render(){
      const { shouldRefresh, user } = this.state
      return (
        <div className="App">

          <Usercontext.Provider value={{shouldRefresh,user,updateRefresh:this.updateRefresh,updateUser:this.updateUser,redirectLogin:this.redirectLogin}}>
                              
            {this.state.showNav && <Navigation/>}
           
            <Switch>
              <Route exact path="/" render={ () =>{
                return(
                  <React.Fragment>
                  <Viewbox updateProducts={this.updateProducts} searchField={this.state.searchField} updateSearch={this.updateSearch} fetchSearch={this.fetchSearch} >
                    <Errorboundary>
                      { this.state.products.length ? <Products items={this.state.products}/> : '' }
                    </Errorboundary>
                  </Viewbox>
                </React.Fragment>
                )}
              }
              />
              <Route path="/login" render={()=>(
                this.state.isLoggedIn ? <Redirect to="/"/> : <Loginpage monitorNav={this.monitorNav}/>
              )}/>
              <Route path="/games/:slug" render={({ match })=>{
                    return (<React.Fragment>
                              <Productpage match={match}
                              productData={this.filterProductBySlug(this.state.products,match.params.slug)}
                              getProduct={this.getProduct}
                              />
                            </React.Fragment>)
                      }
                    }/>
            </Switch>
          </Usercontext.Provider>
        </div>
      );
    }
}

export default App;
