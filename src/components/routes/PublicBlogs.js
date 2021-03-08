import React from 'react'

const PublicBlogs = ({ blogs, loading }) => {
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

  return (
    <ul className="list-group mb-3" style={{ color: 'black' }}>
      {blogs.map(blog => (
        <li key={blog.id} className="list-group-item">{blog.title}</li>
      ))}
    </ul>
  )
}

export default PublicBlogs
