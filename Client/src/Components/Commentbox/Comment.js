import React,{ useState } from 'react'
import { fetchServer } from '../../Utils/Util';
import { Usercontext } from '../../Context/Usercontext'

const Comment = (props) => {

    const [editFormClass,updateFormClass] = useState('')
    const [editText,updateEditText] = useState('')
    const [isEditVisible,showHideEdit] = useState(false)
    const [isEdited, editIt] = useState(props.commentInfo.edited)

    const { user } = React.useContext(Usercontext);

    const {commentInfo,updateComment} = props
    
    //Parsing date
    commentInfo.date = new Date(commentInfo.date);
    let date = commentInfo.date.toLocaleDateString()
    let time = commentInfo.date.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})

    const deleteComment = (e) =>{
        fetchServer(`/comments/${commentInfo.comment_id}`,null,'DELETE')
        .then(resp=>{
            if(resp.status===204)updateComment(commentInfo.comment_id)
            else{
                //Need to put a prompt on failed deletion
                return
            }
        })
    }
    //Updating class of edit box on click
    const updateClass = (e) => {
        updateFormClass(() => editFormClass === '' ? 'commentbox-comment-editbox-active' : '')
        showHideEdit(()=> isEditVisible ? false : true)

    }


    const editComment = (e) => {
        
        e.preventDefault()
        const editDate = new Date()
        const body = JSON.stringify({comment:editText,date:editDate})

        fetchServer(`/comments/${commentInfo.comment_id}`,body,'PATCH',false)
        .then(resp=>{
            if(resp.status===204) updateComment(commentInfo.comment_id,editText,editDate)
            else{
                //Need to put a prompt on failed edit
                return
            }
        })
        .then(noresponse=>{
            updateClass()
            updateEditText('')
            editIt(true)
            }
        )   
    }

    const handleText = (e) => {
        updateEditText(e.target.value)
    }

    let canChangeComment = user.id === commentInfo.id && user.id !== 3

    const { name, comment } = commentInfo;

    return(
            <React.Fragment>
                <div className="commentbox-comment">
                    <div className="commentbox-comment-top">
                        <div className="commentbox-comment-info">
                            <h5>{name}</h5>
                            <small>{date}</small>
                            <small>{time}</small>
                            {isEdited && <small>*</small>}
                        </div>
                        
                        { canChangeComment && (
                            <div className="commentbox-comment-update"> 
                                <span className="commentbox-comment-delete" onClick={deleteComment}></span>
                                {/* Remember to link to fontawesome */}
                                <span className="commentbox-comment-edit" onClick={updateClass}>
                                    <svg focusable="false"className="svg-inline--fa fa-edit fa-w-18" role="img" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
                                </span>
                            </div>
                            )
                        }
                    </div>
                    <p>{comment}</p>

                </div>
                { canChangeComment && isEditVisible && (
                    <div className={"commentbox-comment-editbox " + editFormClass}>
                        <form className="commentbox-comment-form" onSubmit={editComment}>
                            <textarea rows="5" cols="50" value={editText} onChange={handleText} minLength="6" required ></textarea>
                            <input  type="submit" value="Edit comment"></input>
                        </form>
                    </div>
                    )
                }
            </React.Fragment>
    )

}

export default Comment;