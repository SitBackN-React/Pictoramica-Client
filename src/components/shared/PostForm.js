import React from 'react'
import { Link } from 'react-router-dom'

const PostForm = ({ post, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Post Title</label>
      <input
        placeholder="Example: What I have to say"
        value={post.title}
        name="title"
        onChange={handleChange}
      />
      <label>Post Content</label>
      <input
        placeholder="Example: I believe that..."
        value={post.content}
        name="content"
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

export default PostForm
