import React,{ useState } from 'react'

const Comment = ({comment}) => {

    comment.date = new Date(comment.date);
    let date = comment.date.toLocaleDateString()
    let time = comment.date.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})

    return(
            <div className="commentbox-comment">
                <div>
                    <h5>{comment.name}</h5>
                    <small>{date}</small>
                    <small>{time}</small>
                </div>
                <p>{comment.comment}</p>
                
            </div>
    )

}

export default Comment;