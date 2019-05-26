import React from 'react'
import Comment from './Comment'

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
        // fetch('http://localhost:5000/comments',{
        //     method:'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body:JSON.stringify({slug:this.props.slug})
        // }
        // In consideration - Using GET instead of POST

        fetch(`http://localhost:5000/comments/${this.props.slug}`)
        .then(res=>res.json())
        .then(comments=>{console.log(comments);this.setState({users:[...comments],isLoaded:true})})
        .catch(err=>console.log(err))
    }

    handleComment = e => {
        e.preventDefault()
        const {comment,users} = this.state
        const newComment = {comment,slug:this.props.slug}
       

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
                {this.state.isLoaded ? this.state.users.map(user=><Comment key={user.comment_id}  commentInfo={user}/>) : <div className="Loading">Loading</div>}
            </div>
        </div>
    )
    }

}

export default Commentbox;