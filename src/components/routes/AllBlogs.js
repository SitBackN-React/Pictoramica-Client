import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const AllBlogs = (props) => {
  const [allBlogs, setAllBlogs] = useState([])
  // get msgAlerts from props
  const { msgAlert } = props
  // GET request to API for all of the blogs
  useEffect(() => {
    axios({
      url: `${apiUrl}/all-blogs`,
      method: 'GET'
    })
      .then(res => setAllBlogs(res.data.blogs))
      .then(() => msgAlert({
        heading: 'Showing all blogs',
        message: messages.showBlogsSuccess,
        variant: 'primary'
      }))
      // .catch(error => {
      //   setAllBlogs({ title: '' })
      //   msgAlert({
      //     heading: 'Failed to show all blogs ' + error.message,
      //     message: messages.showBlogsFailure,
      //     variant: 'danger'
      //   })
      // })
      .catch(console.error)
  }, [])

  const blogsJsx = allBlogs.map(blog => (
    <div key={blog._id}>
      <div>
        <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </div>
    </div>
  ))

  return (
    <div>
      <h1>All Blogs</h1>
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

export default AllBlogs
