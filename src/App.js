import React from 'react';

import Navigation from './Components/Navigation/Navigation'
import Viewbox from './Components/Viewbox/Viewbox'
import Products from './Components/Products/Products'


import './App.css';


class App extends React.Component{

  constructor(){
    super();
    this.state={
      products:[],
      searchField:""
    }
  }


  updateSearch = (e) => {
    this.setState({searchField:e.target.value})
  }
    
  fetchSearch = (e) => {

    e.preventDefault()
    let fields = `age_ratings,alternative_names,artworks,category,collection,cover.*,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots.*,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;`;

    const url= "https://cors-anywhere.herokuapp.com/" + "api-v3.igdb.com/games"
    fetch(url,{
      method:'POST',
      body: `search "${this.state.searchField}"; fields ${fields} limit 25;`,
      headers: {
        'user-key': process.env.REACT_APP_API_KEY
      }
    })
    .then(res=>res.json())
    .then(products => {
      this.setState({products});
  })
  .catch(err => {
      console.error(err);
  });
 
  
  }

  render(){
  return (
    <div className="App">
      <Navigation />
      <Viewbox searchField={this.state.searchField} updateSearch={this.updateSearch} fetchSearch={this.fetchSearch} >
       { this.state.products.length ? <Products items={this.state.products}/> : '' }
      </Viewbox>
  
    </div>
  );
  }
}

export default App;


