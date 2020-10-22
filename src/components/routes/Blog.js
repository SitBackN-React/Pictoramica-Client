import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const Blog = (props) => {
  const [blog, setBlog] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBlog(res.data.blog))
      .then(() => msgAlert({
        heading: 'Showing selected blog',
        message: messages.showBlogSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setBlog({ title: '' })
        msgAlert({
          heading: 'Failed to show blog' + error.message,
          message: messages.showBlogFailure,
          variant: 'danger'
        })
      })
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Blog Deleted',
        message: messages.deleteBlogSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setBlog({ title: '' })
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deleteBlogFailure,
          variant: 'danger'
        })
      })
  }

  if (!blog) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect to={'/all-blogs'} />
    )
  }
  const postsJsx = blog.posts.map(post => (
    <li key={post._id}>
      <Link to={`/blogs/${props.match.params.blogId}/posts/${post._id}`}>{post.title}</Link>
    </li>
  ))
  console.log(blog)
  return (
    <div className="list-style">
      <h4>{blog.title}</h4>
      <div className="post-display">
        {postsJsx}
      </div>
      <div>
        {props.user._id === blog.owner ? (
          <Link to={`/blogs/${props.match.params.blogId}/create-post`}>
            <button className="btn btn-primary" style={{ display: 'inline' }}>Create Post</button>
          </Link>
        ) : (
          <button style={{ display: 'none' }}></button>
        )}
        {props.user._id === blog.owner ? (
          <button className="btn btn-danger" onClick={destroy} style={{ display: 'inline' }}>Delete Blog</button>
        ) : (
          <button style={{ display: 'none' }}></button>
        )}
        {props.user._id === blog.owner ? (
          <Link to={`/blogs/${props.match.params.blogId}/edit-blog`}>
            <button className="button btn btn-warning" style={{ display: 'inline' }}>Edit Blog</button>
          </Link>
        ) : (
          <button style={{ display: 'none' }}></button>
        )}
      </div>
      <div>
        <button className="btn btn-primary" type="button" onClick={() => props.history.goBack()}>
      Go back
        </button>
      </div>
    </div>
  )
}

export default Blog
