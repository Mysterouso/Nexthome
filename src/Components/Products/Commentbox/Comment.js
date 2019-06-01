import React,{ useState } from 'react'
import { fetchServer } from '../../../Utils/Util';
import { Usercontext } from '../../../Context/Usercontext'

const Comment = (props) => {

    const { user } = React.useContext(Usercontext);

    const {commentInfo,removeComment} = props

    commentInfo.date = new Date(commentInfo.date);
    let date = commentInfo.date.toLocaleDateString()
    let time = commentInfo.date.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})

    const deleteComment = (e) =>{
        fetchServer(`/comments/${commentInfo.comment_id}`,null,'DELETE')
        .then(resp=>{
            if(resp.status==204)removeComment(commentInfo.comment_id)
            else{
                //Need to put a prompt on failed deletion
                return
            }
        })
    }

    let canDelete = user.id == commentInfo.id

    const { name, comment } = commentInfo;

    return(
            <div className="commentbox-comment">
                <div className="commentbox-comment-top">
                    <div >
                        <h5>{name}</h5>
                        <small>{date}</small>
                        <small>{time}</small>
                    </div>
                    { canDelete && <span onClick={deleteComment}></span>}
                </div>


                <p>{comment}</p>
            </div>
    )

}

export default Comment;