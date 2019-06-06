import React from 'react'
import Comment from './Comment'
import { Usercontext } from '../../Context/Usercontext';

class Commentbox extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            comment:'',
            users:[],
            isLoaded:false
        }
    }

    componentDidMount(){

        fetch(`http://localhost:5000/comments/${this.props.slug}`)
        .then(res=>res.json())
        .then(comments=>this.setState({users:[...comments],isLoaded:true}))
        .catch(err=>console.log(err))
    }

    handleComment = e => {
        e.preventDefault()
        
        const { user } = this.context;
        const {comment,users} = this.state;

        const newComment = {userID:user.id,comment,slug:this.props.slug}
       

        fetch('http://localhost:5000/comments',{
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(newComment)
        })
        .then(res=>res.json())
        .then(returnedComment=>{
            console.log(returnedComment)
            this.setState({users:[returnedComment[0],...users],
                            comment:''
                            })
                        })
    }

    handleText = e => {
        this.setState({comment:e.target.value})
    }

    updateComment = (comment_id,comment, date) => {
        if(!comment){
            this.setState(prevState=>{
                return {users: prevState.users.filter(user=> user.comment_id != comment_id)}
            })
        }
        else{
            this.setState(prevState=>{
                const editIndex = prevState.users.findIndex(user => user.comment_id === comment_id)
                const omittedArr = prevState.users.filter(user=> user.comment_id != comment_id)
                return { users: 
                            [{...prevState.users[editIndex],comment,date},...omittedArr]
                         }
            })
        }
    }

    render(){


    return(
        <div className="commentbox-container">
            <div className="commentbox-textfield-container">
                    <form className="commentbox-form" onSubmit={this.handleComment}>
                        <textarea rows="5" cols="50" value={this.state.comment} onChange={this.handleText} minLength="6" required ></textarea>
                        <input  type="submit" value="Add comment"></input>
                    </form>
            </div>
            <div className="commentbox-comment-container">
                {this.state.isLoaded ? this.state.users.map(user=><Comment key={user.comment_id} updateComment={this.updateComment}  commentInfo={user}/>) : <div className="Loading">Loading</div>}
            </div>
        </div>
    )
    }
}

Commentbox.contextType = Usercontext;


export default Commentbox;