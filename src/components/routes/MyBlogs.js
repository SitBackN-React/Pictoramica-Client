import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const MyBlogs = (props) => {
  const [myBlogs, setMyBlogs] = useState([])

  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/my-blogs`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setMyBlogs(res.data.blogs))
      .then(() => msgAlert({
        heading: 'Showing all of your blogs',
        message: messages.showMyBlogsSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setMyBlogs({ title: '' })
        msgAlert({
          heading: 'Failed to show your blogs ' + error.message,
          message: messages.showMyBlogsFailure,
          variant: 'danger'
        })
      })
  }, [])

  const blogsJsx = myBlogs.map(blog => (
    <div key={blog._id}>
      <div>
        <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </div>
    </div>
  ))

  return (
    <div>
      <h4>My Blogs</h4>
      <div>
        <div>
          {blogsJsx}
        </div>
      </div>
      <Link to={'/create-blog'}>
        <button className="button btn btn-primary btn-lg">Create New Blog</button>
      </Link>
    </div>
  )
}

export default MyBlogs
