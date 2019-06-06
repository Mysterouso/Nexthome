import React from 'react';
import Productinfo from '../../Components/Products/Productinfo';

class Productpage extends React.Component{

    constructor(props){
        super(props)
        this.state= {
            product:[],
            validItem: false,
            isLoading:true
        }
    }
   

    componentDidMount(){
        const { getProduct, productData, match } = this.props
        const defaultStateChange = {isLoading:false, validItem:true}
       
        if(!productData.length){
            getProduct(match.params.slug)
            .then(resp=> resp[0] ? resp[0] : {})
            .then(product => {
                if(product.hasOwnProperty('name')){
                    this.setState({product:product,...defaultStateChange})
                }
                else{
                    this.setState({isLoading:false,validItem:false})}
              })
            .catch(err=> console.log(err))
        }
        else if(productData[0].hasOwnProperty('name')){
            this.setState({product:productData[0],...defaultStateChange})
        } 
        
        // Temporary -- TESTING VARIABLES
        // const newState = {
        //     name:'Battlefield V',
        //     id:24,
        //     summary:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //     total_rating:85,
        //     total_rating_count:25,
        // }

        // this.setState({product:newState,isLoading:false,validItem:true})
    }


    render(){
        return(
        <div>
           { this.state.isLoading ? <h1>Loading</h1> : this.state.validItem ? (
            <React.Fragment>
                <Productinfo slug={this.props.match.params.slug} info={this.state.product}/>
            </React.Fragment>
            ) :  <h1>ERROR PAGE NOT FOUND</h1>
            }
        </div>)
    
    }
}

export default Productpage;



// { this.state.validItem ? (
//     <React.Fragment>
//         <p>{this.state.product.name}</p>
//         <p>{this.state.product.id}</p>
//         <p>{this.state.product.total_rating}</p>
//     </React.Fragment>
//     ) : this.state.isLoading ? <h1>Loading</h1> : <h1>ERROR PAGE NOT FOUND</h1>
//     }


// { this.state.isLoading ? <h1>Loading</h1> : this.state.validItem ? (
//     <React.Fragment>
//         <p>{this.state.product.name}</p>
//         <p>{this.state.product.id}</p>
//         <p>{this.state.product.total_rating}</p>
//     </React.Fragment>
//     ) :  <h1>ERROR PAGE NOT FOUND</h1>
//     }