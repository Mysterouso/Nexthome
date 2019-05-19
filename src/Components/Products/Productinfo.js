import React from 'react';
import { changeImageSize } from '../../Utils/Util'
import './Productinfo.css'

const Productinfo = ({info}) =>{

    // const resizedImage = changeImageSize(info.cover.url,'_720p')
    const resizedImage1 = 'https://images.igdb.com/igdb/image/upload/t_720p/vkdea0wwyn0zx8fjs1kt.jpg'
    setTimeout(()=>{
        document.documentElement.style
    .setProperty('--loading-bar', '100%');
    },3000)
    

    return(
        <div className="info-page">
            <div className="info"></div>
            <div className="info-">
                <div className="info-container">
                    <div className="info-image">
                        <img src={resizedImage1} alt="hi"/>
                    </div>
                    <div className="info-text">
                        <h1>{info.name}</h1>
                        <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                        <div className="info-text-side">
                            <p>Made by Company</p>
                            <p>Released:2017</p>
                        </div>
                    </div>
                </div>  
            </div>
            <div className="info-bar-container">
                <div className="info-bar">
                    <h4>
                        <span>85/100</span>
                        {/* <small>From 10 reviews</small>         */}
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Productinfo;