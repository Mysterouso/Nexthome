import React from 'react';
import { changeImageSize } from '../../Utils/Util'

const Productinfo = ({info}) =>{

    const resizedImage = changeImageSize(info.cover.url,'_screenshot_small')

    return(
        <div style={{marginTop:"4rem"}} className="info-container">
        <img src={resizedImage} alt="hi"/>
        </div>
    )
}

export default Productinfo;