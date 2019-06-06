import React from 'react';
import { Usercontext } from '../../Context/Usercontext'
import './Viewbox.css'

class Viewbox extends React.Component {

    componentWillUnmount(){
        if(this.context.shouldRefresh){ 
            this.props.updateProducts([]);
            const mockData = {target:{value:''}}
            this.props.updateSearch(mockData)
        }
    }
    
    render(){
    const { searchField,updateSearch,fetchSearch } = this.props
    return (
        <div className="main-container">
            <div className="main">
                {/* <div className="options">
                
                </div> */}
                <div className="viewbox">
                    <div className="searchbox">
                        <div className="searchbox-container">
                            <input className="searchbox-search" onChange={updateSearch} type="text" value={searchField} placeholder="Enter your location"/>
                        </div>
                        <input className="searchbox-submit" onClick={fetchSearch} type="submit" />
                    </div>
                    {this.props.children}
                </div>
            </div>
        </div>
    )
    }
}

Viewbox.contextType = Usercontext;

export default Viewbox;
