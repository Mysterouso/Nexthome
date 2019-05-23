import React,{ useState } from 'react'

const Comment = ({commentInfo}) => {

    commentInfo.date = new Date(commentInfo.date);
    let date = commentInfo.date.toLocaleDateString()
    let time = commentInfo.date.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})

    const { name, comment } = commentInfo;

    return(
            <div className="commentbox-comment">
                <div >
                    <h5>{name}</h5>
                    <small>{date}</small>
                    <small>{time}</small>
                </div>
                <p>{comment}</p>
                
            </div>
    )

}

export default Comment;