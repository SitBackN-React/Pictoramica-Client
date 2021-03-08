import React from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

const PublicBlogs = (props) => {
  const { blogs, loading } = props

  if (loading) {
    return <h1>Loading</h1>
  }

  const blogsJsx = blogs.map(blog => (
    <li key={blog.id}>
      <Card border={blog.borderColor} style={{ margin: '10px', borderWidth: '8px', color: 'black' }}>
        <Card.Body>
          <Card.Title>
            <Link to={`/blogs/${blog._id}`}>
              {blog.title}
            </Link>
          </Card.Title>
          <Card.Text>
            {blog.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </li>
  ))

  return (
    <ul style={{ color: 'black' }}>
      <CardDeck style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {blogsJsx}
      </CardDeck>
    </ul>
  )
}

export default PublicBlogs
