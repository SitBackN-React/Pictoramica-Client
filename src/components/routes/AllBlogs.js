import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import PublicBlogs from './PublicBlogs'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const AllBlogs = (props) => {
  const [allBlogs, setAllBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [blogsPerPage] = useState(10)

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

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mt-5" style={{ textAlign: 'center' }}>
      <h1>All Blogs</h1>
      <PublicBlogs
        blogs={currentBlogs}
        loading={loading}
        {...props}
      />
      <Pagination
        blogsPerPage={blogsPerPage} totalBlogs={allBlogs.length}
        paginate={paginate}
      />
    </div>
  )
}

export default AllBlogs
