import React from 'react';
import Commentbox from './Commentbox/Commentbox'
import { changeImageSize,dateInMonthYear } from '../../Utils/Util'
import './Productinfo.css'

const Productinfo = ({ info, slug }) =>{

    const resizedImage = changeImageSize(info.cover.url,'_720p')
    // const resizedImage1 = 'https://images.igdb.com/igdb/image/upload/t_720p/vkdea0wwyn0zx8fjs1kt.jpg' --TESTING VARIABLE
    setTimeout(()=>{
        document.documentElement.style
    .setProperty('--loading-bar', `${Math.round(info.total_rating || 100)}%`);
    },800)

    console.log(slug)
    

    return(
        <div className="info-page">
            <div className="info"></div>
            <div className="info-">
                <div className="info-container">
                    <div className="info-image">
                        <img src={resizedImage} alt="hi"/>
                    </div>
                    <div className="info-text">
                        <h1>{info.name}</h1>
                        <p>
                        {info.summary}
                        </p>
                        <div className="info-text-side">
                            {/* <p>Made by Company</p> */}
                            <p>Released: {dateInMonthYear(info.first_release_date)}</p>
                        </div>
                    </div>
                </div>  
            </div>
            <div className="info-bar-container">
                <div className="info-bar">
                    <h4>
                        <span>{info.total_rating ? Math.round(info.total_rating) + ' / 100' : 'No reviews available'}</span>
                    </h4>
                </div>
                {info.total_rating && <small>From {info.total_rating_count} reviews</small>}
            </div>
            <div className="info-bar-review">
                <h2>Own the game? Why not share your thoughts below?</h2>
                <Commentbox slug={slug} comments="insert comments here"/>
            </div>  
        </div>
    )
}

export default Productinfo;