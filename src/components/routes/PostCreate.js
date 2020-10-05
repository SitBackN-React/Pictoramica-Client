import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import PostForm from './../shared/PostForm'
import messages from './../AutoDismissAlert/messages'

const PostCreate = props => {
  const [post, setPost] = useState({
<<<<<<< HEAD
    tite: '',
=======
    title: '',
>>>>>>> 6e1b7c42fad63872dcb386918fe58a5c73b3e47e
    content: ''
  })
  const [createdPostId, setCreatedPostId] = useState(null)
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
<<<<<<< HEAD

    const editedPost = Object.assign({}, post, updatedField)

=======
    const editedPost = Object.assign({}, post, updatedField)
>>>>>>> 6e1b7c42fad63872dcb386918fe58a5c73b3e47e
    setPost(editedPost)
  }

  const handleSubmit = event => {
    event.preventDefault()
<<<<<<< HEAD

    const { msgAlert } = props
=======
    const { msgAlert } = props
    console.log(props)
>>>>>>> 6e1b7c42fad63872dcb386918fe58a5c73b3e47e
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { post }
    })
<<<<<<< HEAD
      .then(res => {
        const newPostId = res.data.blog.posts[res.data.blog.posts.length - 1]._id
        return newPostId
      })
      .then(newPostId => setCreatedPostId(newPostId))
      .then(() => msgAlert({
        heading: 'Created post successfully',
        message: messages.createPostSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setPost({ tite: '', content: '' })
        msgAlert({
          heading: 'Create post failed: ' + error.message,
          message: messages.createPostFailure,
=======
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
>>>>>>> 6e1b7c42fad63872dcb386918fe58a5c73b3e47e
          variant: 'danger'
        })
      })
  }
  if (createdPostId) {
<<<<<<< HEAD
    return <Redirect to={`/blogs/${props.match.params.blogId}`} />
  }

=======
    return <Redirect to= {`/blogs/${props.match.params.id}/posts`}/>
  }
>>>>>>> 6e1b7c42fad63872dcb386918fe58a5c73b3e47e
  return (
    <div>
      <PostForm
        post={post}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
<<<<<<< HEAD
        cancelPath={`/blogs/${props.match.params.blogId}`}
=======
        cancelPath='/posts'
>>>>>>> 6e1b7c42fad63872dcb386918fe58a5c73b3e47e
      />
    </div>
  )
}

export default PostCreate
