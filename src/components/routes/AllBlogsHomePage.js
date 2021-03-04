import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
// import Pagination from 'react-bootstrap/Pagination'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const AllBlogsHomePage = (props) => {
  const [setAllBlogs] = useState([])
  const [recentBlogs, setRecentBlogs] = useState([])
  // get msgAlerts from props
  const { msgAlert } = props
  // GET request to API for all of the blogs
  useEffect(() => {
    axios({
      url: `${apiUrl}/all-blogs`,
      method: 'GET'
    })
      .then(res => {
        // setAllBlogs(res.data.blogs)
        if (res.data.blogs.length > 0) {
          const firstRecentBlog = res.data.blogs.shift()
          const secondRecentBlog = res.data.blogs.shift()
          const thirdRecentBlog = res.data.blogs.shift()
          const fourthRecentBlog = res.data.blogs.shift()
          const recentBlogs = [firstRecentBlog, secondRecentBlog, thirdRecentBlog, fourthRecentBlog]
          setRecentBlogs(recentBlogs)
        }
      })
      .then(() => msgAlert({
        heading: 'Showing all blogs',
        message: messages.showBlogsSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setAllBlogs([])
        msgAlert({
          heading: 'Failed to show all blogs ' + error.message,
          message: messages.showBlogsFailure,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }, [])

  const blogsJsx = recentBlogs.map(blog => (
    <div key={blog._id}>
      <Card border={blog.borderColor} style={{ margin: '10px', borderWidth: '8px', color: 'black' }}>
        <Card.Body>
          <Card.Title>
            {blog.title}
          </Card.Title>
          <Card.Text>
            {blog.description}
          </Card.Text>
          <Link to={`/blogs/${blog._id}`}>
            <Button variant="outline-secondary">Read more</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  ))

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Recent Content</h1>
      <br />
      <div>
        <CardDeck style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {blogsJsx}
        </CardDeck>
      </div>
    </div>
  )
}

export default AllBlogsHomePage