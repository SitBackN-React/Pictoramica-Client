import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import messages from './../AutoDismissAlert/messages'
// import CommentForm from './../shared/CommentForm'

const CommentDelete = (props) => {
  // const { msgAlert } = props
  const [deleted, setDeleted] = useState({
    remark: props.remark
  })
  const handleClick = (event, id) => {
    // event.preventDefault()
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/comments/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      // .then(() => msgAlert({
      //   heading: 'Comment Deleted',
      //   message: messages.deleteCommentSuccess,
      //   variant: 'success'
      // }))
      .catch(console.error)
  }
  if (!props) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect to={`/blogs/${props.match.params.blogId}`} />
    )
  }
  return (
    <button className="btn btn-danger" onClick={(event) => {
      handleClick(event)
    }}>
    </button>
  )
}

export default CommentDelete
