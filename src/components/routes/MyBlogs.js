import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
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
  console.log(myBlogs)
  // const bgColors = ['Primary',
  //   'Secondary',
  //   'Success',
  //   'Danger',
  //   'Warning',
  //   'Info',
  //   'Light',
  //   'Dark'
  // ]
  // const bgRandom = Math.floor(Math.random() * 8)
  // console.log(bgColors[bgRandom])

  const blogsJsx = myBlogs.map(blog => (
    <div key={blog._id}>
      <Card border={blog.backgroundId} style={{ margin: '10px', borderWidth: '5px' }}>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
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

  // const blogCard = [
  //   'Primary',
  //   'Secondary',
  //   'Success',
  //   'Danger',
  //   'Warning',
  //   'Info',
  //   'Light',
  //   'Dark'
  // ].map((variant, idx) => (
  //   { blogsJsx }
  // ))

  return (
    <div style={{ textAlign: 'center' }}>
      <h4>My Blogs</h4>
      <div>
        <div>
          <CardDeck style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {blogsJsx}
          </CardDeck>
        </div>
      </div>
      <br />
      <div >
        <Link to={'/create-blog'}>
          <button className="button btn btn-dark btn-lg">Create New Blog</button>
        </Link>
      </div>
    </div>
  )
}

export default MyBlogs
