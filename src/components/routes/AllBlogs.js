import React, { useState, useEffect } from 'react'
// import Card from 'react-bootstrap/Card'
// import CardDeck from 'react-bootstrap/CardDeck'
// import Button from 'react-bootstrap/Button'
import Pagination from './Pagination'
// import { Link } from 'react-router-dom'
import PublicBlogs from './PublicBlogs'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const AllBlogs = (props) => {
  const [allBlogs, setAllBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [blogsPerPage] = useState(10)
  // get msgAlerts from props
  const { msgAlert } = props
  // GET request to API for all of the blogs
  useEffect(() => {
    axios({
      url: `${apiUrl}/all-blogs`,
      method: 'GET'
    })
      .then(res => {
        setAllBlogs(res.data.blogs)
        setLoading(false)
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
  console.log(allBlogs)

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
  //
  // const blogsJsx = currentBlogs.map(blog => (
  //   <div key={blog._id}>
  //     <Card border={blog.borderColor} style={{ margin: '10px', borderWidth: '8px', color: 'black' }}>
  //       <Card.Body>
  //         <Card.Title>
  //           {blog.title}
  //         </Card.Title>
  //         <Card.Text>
  //           {blog.description}
  //         </Card.Text>
  //         <Link to={`/blogs/${blog._id}`}>
  //           <Button variant="outline-secondary">Read more</Button>
  //         </Link>
  //       </Card.Body>
  //     </Card>
  //   </div>
  // ))

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mt-5">
      <h1 style={{ textAlign: 'center' }}>All Blogs</h1>
      <PublicBlogs
        blogs={currentBlogs}
        loading={loading}
        {...props}
      />
      <Pagination blogsPerPage={blogsPerPage} totalBlogs={allBlogs.length} paginate={paginate} />
    </div>
  )
}

export default AllBlogs
