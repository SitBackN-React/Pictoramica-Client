import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import PostForm from './../shared/PostForm'
import messages from './../AutoDismissAlert/messages'

const PostCreate = props => {
  const [post, setPost] = useState({
    title: '',
    content: ''
  })
  const [createdPostId, setCreatedPostId] = useState(null)
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedPost = Object.assign({}, post, updatedField)
    setPost(editedPost)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = props

    axios({
      url: `${apiUrl}/posts`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { post }
    })
      .then(res => setCreatedPostId(res.data.post._id))
      .then(() => msgAlert({
        heading: 'Create post success',
        message: messages.createdPostSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setPost({ title: '', content: '' })
        msgAlert({
          heading: 'Create post failed: ' + error.message,
          message: messages.createBlogFailure,
          variant: 'danger'
        })
      })
  }
  if (createdPostId) {
    return <Redirect to={'/posts'} />
  }
  return (
    <div>
      <PostForm
        post={post}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/posts'
      />
    </div>
  )
}

export default PostCreate
