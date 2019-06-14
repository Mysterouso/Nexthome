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
    const { searchField, isDisabled, updateSearch, fetchSearch } = this.props
    return (
        <div className="main-container">
            <div className="main-header-image">
                <h1 className="main-header">Metadata for your favourite games</h1>
            </div>
            <div className="main">
                {/* <div className="options">
                
                </div> */}
                <div className="viewbox">
                    <form className="searchbox" onSubmit={fetchSearch}>
                        <div className="searchbox-container">
                            <input className="searchbox-search" onChange={updateSearch} type="text" value={searchField} placeholder="Search..."/>
                        </div>
                       
                        <input className="searchbox-submit" type="submit" disabled={isDisabled} value="Search" />
                    </form>
                    {isDisabled ? <div className="spinner"></div> : this.props.children }
                </div>
            </div>
        </div>
    )
    }
}

Viewbox.contextType = Usercontext;

export default Viewbox;
