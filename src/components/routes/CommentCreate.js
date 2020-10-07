import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import CommentForm from './../shared/CommentForm'
import messages from './../AutoDismissAlert/messages'

const CommentCreate = props => {
  const [comment, setComment] = useState({
    remark: ''
  })
  const [createdCommentId, setCreatedCommentId] = useState(null)
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedComment = Object.assign({}, comment, updatedField)
    setComment(editedComment)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert } = props

    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { comment }
    })

      .then(res => {
        const newCommentId = res.data.blog.post.comments[res.data.blog.post.comments.length - 1]._id
        return newCommentId
      })
      .then(newCommentId => setCreatedCommentId(newCommentId))
      .then(() => msgAlert({
        heading: 'Created comment successfully',
        message: messages.createCommentSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setComment({ remark: '' })
        msgAlert({
          heading: 'Create comment failed: ' + error.message,
          message: messages.createCommentFailure,
          variant: 'danger'
        })
      })
  }
  if (createdCommentId) {
    return <Redirect to={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}`} />
  }

  return (
    <div>
      <CommentForm
        comment={comment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}`}
      />
    </div>
  )
}

export default CommentCreate
