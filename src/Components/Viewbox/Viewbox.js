import React from 'react';
import Checkbox from './Inputs/Checkbox'
import './Viewbox.css'

class Viewbox extends React.Component {
    
   
    render(){
    const { searchfield,updateSearch,submitRequest } = this.props
    return (
        <div className="main">
            <div className="options">
            
            </div>
            <div className="viewbox">
                <div className="searchbox">
                    <div className="searchbox-container">
                        <Checkbox/>
                        <input onChange={updateSearch} type="text" value={searchfield} placeholder="Enter your location"/>
                    </div>
                    <input onClick={submitRequest} type="submit" />
                </div>
                {this.props.children}
            </div>
        </div>
    )
    }
}

export default Viewbox;
