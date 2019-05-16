import React from 'react';

const Checkbox = () =>{

    return(
        <div>
        <label className="checkbox-container">
            <input type="checkbox"/>
            <span>Buy</span>
        </label>
        <label className="checkbox-container">
            <input type="checkbox"/>
            <span>Rent</span>
        </label>
    </div>
    )
}

export default Checkbox