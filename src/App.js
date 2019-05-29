import React from 'react';
import { Route,Switch,Redirect } from "react-router-dom";
import { Usercontext } from './Context/Usercontext';
import { fetchServer,defaultUser } from './Utils/Util'

import Errorboundary from './Components/Errorboundary';
import Navigation from './Components/Navigation/Navigation'
import Viewbox from './Components/Viewbox/Viewbox'
import Products from './Components/Products/Products'
import Productpage from './Components/Products/Productpage'
import Loginpage from './Components/Login/Loginpage'

import './App.css';

class App extends React.Component{

  constructor(){
    super();
    this.state={
      products:[],
      isLoggedIn:false,
      searchField:"",
      user: defaultUser
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
    
    let fields = `age_ratings,alternative_names,category,collection,cover.*,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;`;
    let body = (`search "${this.state.searchField}"; fields ${fields} limit 25;`)
    const url= "https://cors-anywhere.herokuapp.com/" + "api-v3.igdb.com/games"
    
    if(purpose==='get'){
      body= `fields ${fields} where slug = "${slug}";`
    }
    return fetch(url,{
      method:'POST',
      body,
      headers: {
        'user-key': process.env.REACT_APP_API_KEY
      }
    })
     
  }
    
  fetchSearch = (e) => {
    e.preventDefault()
     this.handleFetch()
     .then(res=>res.json())
    .then(products => {
      this.setState({products});
      console.log(products);
  })
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



    render(){
      return (
        <div className="App">
          {/* <button onClick={(e)=>this.getProduct(e,"ratchet-clank-going-commando").then(item=>console.log(item))}>getProduct here</button> */}
          {/* component={Loginpage} */}
          <Usercontext.Provider value={{user:this.state.user,updateUser:this.updateUser,redirectLogin:this.redirectLogin}}>
            {/* <Home/> */}
            <Switch>

             
              <Route exact path="/" render={ () =>{
                return(
                  <React.Fragment>
                  <Navigation/>
                  <Viewbox searchField={this.state.searchField} updateSearch={this.updateSearch} fetchSearch={this.fetchSearch} >
                    <Errorboundary>
                      { this.state.products.length ? <Products items={this.state.products}/> : '' }
                    </Errorboundary>
                  </Viewbox>
                </React.Fragment>
                )}
              }
              />

              <Route path="/login" render={()=>(
                this.state.isLoggedIn ? <Redirect to="/"/> : <Loginpage/>
              )}/>
          
              <Route path="/games/:slug" render={({ match })=>{
                    return (<React.Fragment>
                              <Navigation/>
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

const Home = () =>{
  const howdy = React.useContext(Usercontext);
  console.log('Do I work here?', howdy)
  return(
    <div>This is Home</div>
    )
  }
