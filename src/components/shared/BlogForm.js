import React from 'react'
import { Link } from 'react-router-dom'

const BlogForm = ({ blog, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Blog Title</label>
      <input
        placeholder="Example: My thoughts"
        value={blog.title}
        name="name"
        onChange={handleChange}
      />
    </div>
    <br />
      <button type="submit" className="btn btn-primary">Submit</button>
        <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default BlogForm
