import React from 'react';
import Productsummary from './Productsummary'
import { Link } from 'react-router-dom'
import { changeImageSize } from '../../Utils/Util'

import './Products.css'

const Products  = ({ items }) => {

    const parsedItems = items.filter(entry=>entry.hasOwnProperty('cover') && entry.hasOwnProperty('name'))

 

    
    return(
      <React.Fragment>
      {parsedItems.map((item,i) =>{ 
        const { id, name, summary, total_rating, total_rating_count,
          cover:{url}, first_release_date, slug} = item;

        let releaseYear = Math.floor(1970 + first_release_date/(24*60*60*365))
        const isNotNumber = isNaN(releaseYear)
        releaseYear = isNotNumber ? " Not available" : releaseYear
        
        const resizedImage = changeImageSize(url,'_logo_med') || <h3>No image available</h3>
        return(
          <div key={id} className="product">
            <div className="product-top">
              <Link to={`/games/${slug}`}>
               <h2>{name}</h2>
              </Link>
              <div className="product-image">
                <img src={resizedImage} alt={id}/>
                <Productsummary summary={summary}/>
              </div>
            </div>
            <div className="product-bottom">
              { total_rating ? (
                <small> Rated {total_rating.toFixed(1)} from {total_rating_count} reviews</small>) : <small>No reviews available</small>
                }
              <div className="product-description">
                <h4>Released:{releaseYear}</h4> {/* Parsing unicode date */}
              </div>
            </div>
        </div>

         )}
      )
    }
    </React.Fragment>
    )
}

export default Products;
