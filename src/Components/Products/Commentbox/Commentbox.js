import React from 'react'
import Comment from './Comment'

class Commentbox extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            comment:'',
            users:[]
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/comments',{
            method:'POST',
            body:{slug:this.props.slug,name:'bobo'}
        }
        ).then(res=>res.json())
        .then(comments=>{console.log(comments);this.setState({users:[...comments]})})
    }

    handleComment = e => {
        e.preventDefault()
        const {comment,users} = this.state
       //Add validation checks here
       //Remove hardcoded values in newComment
       const newComment = {name:"Anonymous",date:new Date(),comment}
       this.setState({users:[newComment,...users],
                      comment:''
                    })
       

    }
    handleText = e => {
        this.setState({comment:e.target.value})
    }

    render(){

    return(
        <div className="commentbox-container">
            <div className="commentbox-textfield-container">
                    <form className="commentbox-form" onSubmit={this.handleComment}>
                        <textarea rows="5" cols="50" value={this.state.comment} onChange={this.handleText} required ></textarea>
                        <input  type="submit" value="Add comment"></input>
                    </form>
            </div>
            <div className="commentbox-comment-container">
                {this.state.users.map(user=><Comment comment={user}/>)}
            </div>
        </div>
    )
    }

}

export default Commentbox;