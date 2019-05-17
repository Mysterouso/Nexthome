import React from 'react';

import Errorboundary from './Components/Errorboundary';
import Navigation from './Components/Navigation/Navigation'
import Viewbox from './Components/Viewbox/Viewbox'
import Products from './Components/Products/Products'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import './App.css';


class App extends React.Component{

  constructor(){
    super();
    this.state={
      products:[],
      product:{},
      searchField:""
    }
  }


  updateSearch = (e) => {
    this.setState({searchField:e.target.value})
  }

  handleFetch = (e,purpose='search',slug='') => {
    
    e.preventDefault()

    let fields = `age_ratings,alternative_names,artworks,category,collection,cover.*,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots.*,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;`;
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
     this.handleFetch(e)
     .then(res=>res.json())
    .then(products => {
      this.setState({products});
      console.log(products);
  })
  .catch(err => {
      console.error(err);
  });
  }

  getProduct = (e,slug) => {
    this.handleFetch(e,'get',slug)
    .then(res=>{
      if(!res.ok){
        throw new Error('Please enter a valid name')
      } 
      else{
        return res.json()
      }
    })
    .then(product => {
      this.setState({product})
      console.log('This is the product',product)
    })
    .catch(err => {
      console.error(err);
  });
  }


  render(){
  return (
    <div className="App">
      <button onClick={(e)=>this.getProduct(e,"ratchet-clank-going-commando")}>getProduct here</button>
      <Navigation />
      <Viewbox searchField={this.state.searchField} updateSearch={this.updateSearch} fetchSearch={this.fetchSearch} >
       <Errorboundary>
        { this.state.products.length ? <Products items={this.state.products}/> : '' }
       </Errorboundary>
      </Viewbox>
  
    </div>
  );
  }
}

export default App;


