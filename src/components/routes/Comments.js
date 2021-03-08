import React from 'react'
import CommentCreate from './CommentCreate'
const Comments = (props) => {
  const { post } = props
  const commentsJsx = post.comments.map(comment => (
    <li className="comment-list" key={comment._id}>
      <p>Posted By: {comment.commenter}</p>
      <p>{comment.remark}</p>
    </li>
  ))
  return (
    <div>
      <div>{commentsJsx}</div>
      <div>
        <CommentCreate
          {...props}
        />
      </div>
    </div>
  )
}

export default Comments
