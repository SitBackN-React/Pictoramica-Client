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
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/comments`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { comment }
    })
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => {
        console.log(res.data.blog.posts.comments.length)
        const newCommentId = res.data.blog.posts.comments[res.data.blog.posts.comments.length - 1]._id
        console.log(newCommentId)
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
  console.log(createdCommentId)
  console.log(props)
  if (createdCommentId) {
    return <Redirect to={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}`}/>
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
