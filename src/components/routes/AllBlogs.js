import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
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

  const active = 2
  const items = []
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    )
  }

  const paginationBasic = (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  )

  const blogsJsx = allBlogs.map(blog => (
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
      <h1>All Blogs</h1>
      <br />
      <div>
        <CardDeck style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {blogsJsx}
        </CardDeck>
      </div>
      {paginationBasic}
    </div>
  )
}

export default AllBlogs
