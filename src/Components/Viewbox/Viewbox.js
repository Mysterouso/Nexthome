import React from 'react';
import './Viewbox.css'

class Viewbox extends React.Component {
    
   
    render(){
    const { searchfield,updateSearch,submitRequest } = this.props
    return (
        <div className="viewbox">
            <div className="searchbox">
                <input onChange={updateSearch} type="text" value={searchfield} placeholder="Enter your location"/>
                <input onClick={submitRequest} type="submit" />
            </div>
        </div>
    )
    }
}

export default Viewbox;
