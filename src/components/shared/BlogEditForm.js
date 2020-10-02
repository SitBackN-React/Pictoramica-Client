import React from 'react'
import { Link } from 'react-router-dom'

const BlogEditForm = ({ blog, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Blog Title</label>
      <input
        value={blog.title}
        name="title"
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

export default BlogEditForm
