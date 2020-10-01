import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([])
  // get msgAlerts from props
  const { msgAlert } = props
  // GET request to API for all of the blogs
  useEffect(() => {
    axios({
      url: `${apiUrl}/blogs`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBlogs(res.data.blogs))
      .then(() => msgAlert({
        heading: 'Showing all blogs',
        message: messages.showBlogsSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setBlogs({ title: '' })
        msgAlert({
          heading: 'Failed to show all blogs ' + error.message,
          message: messages.showBlogsFailure,
          variant: 'danger'
        })
      })
  }, [])

  const blogsJsx = blogs.map(blog => (
    <div key={blog.id}>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
    </div>
  ))

  return (
    <div>
      <h1>My Blogs</h1>
      <br />
      <div>
        {blogsJsx}
      </div>
      <Link to={'/create-blog'}>
        <button variant="primary">Add Blog</button>
      </Link>
    </div>
  )
}

export default Blogs
