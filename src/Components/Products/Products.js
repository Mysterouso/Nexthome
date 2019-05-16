import React from 'react';
import Productsummary from './Productsummary'

const Products  = ({ items }) => {

    // const [isExpanded,expandText] = React.useState(false)
    
    const regex = /_[\S]+(?=\/)/g // Image size can be configured by url - Resizing the image

    
    
    return(
      <React.Fragment>
      {items.map((item,i) => { 
      try{
        const { id, name, summary, total_rating, total_rating_count,
          cover:{url}, first_release_date} = item;
        // let trimmed = isExpanded ? summary : summary.slice(0,140);
        const resizedImage = url.replace(regex,'_logo_med')
        return(
          <div key={id} className="product">
            <div className="product-top">
              <h2>{name}</h2>
              <div className="product-image">
                <img src={resizedImage} alt={id}/>
                <Productsummary summary={summary}/>
                {/* <p>{trimmed}<span onClick={()=>expandText((prevState)=>!prevState)}>...</span></p> */}
               
              </div>
              { total_rating ? (
                <small> Rated {total_rating.toFixed(1)} from {total_rating_count} reviews</small>):<small>No reviews available</small>
                }
              <div className="product-description">
                <h4>Released:{Math.floor(1970 + first_release_date/(24*60*60*365))}</h4> {/* Parsing unicode date */}
              </div>
            </div>
        </div>
        )}
      catch(err){
         console.error(err)
       }
      })
    }
    </React.Fragment>
    )
}

export default Products;



// const updateText = (e,arr) =>{
    //   e.persist()
    //   let hi = e.target.previousSibling
    //   if(hi.textContent===arr){hi.textContent=arr.slice(0,140);e.target.textContent='...'}
    //   else{
    //   hi.textContent = arr;
    //   e.target.textContent='-'
    //   }
    // } NOT SURE IF REGULAR DOM MANIPULATION SHOULD BE DONE
    /* <p> <span>{summary}</span><span onClick={(e)=>updateText(e,summary)}>...</span></p> */