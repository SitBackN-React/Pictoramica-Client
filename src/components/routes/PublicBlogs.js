import React from 'react'
import { Link } from 'react-router-dom'

const PublicBlogs = (props) => {
  const { blogs, loading } = props

  if (loading) {
    return <h1>Loading</h1>
  }

  // return (
  //   <div style={{ textAlign: 'center' }}>
  //     <h1>All Blogs</h1>
  //     <br />
  //     <div>
  //       <CardDeck style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  //         {blogsJsx}
  //       </CardDeck>
  //     </div>
  //     {paginationBasic}
  //   </div>
  // )

  const blogsJsx = blogs.map(blog => (
    <li key={blog.id} className="list-group-item">
      <Link to={`/blogs/${blog._id}`}>
        {blog.title}
      </Link>
    </li>
  ))

  return (
    <ul className="list-group mb-3" style={{ color: 'black' }}>
      {blogsJsx}
    </ul>
  )
}

export default PublicBlogs
