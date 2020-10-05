import React from 'react'
import { Link } from 'react-router-dom'

const PostForm = ({ post, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div>
<<<<<<< HEAD
      <label>Blog Post Title</label>
      <input
        placeholder="Ex: My First Blog Post"
        value={post.title || ''}
        name="title"
        onChange={handleChange}
        size="25"
        autoFocus
      />
    </div>
    <div>
      <label>Content</label>
      <textarea
        placeholder="Ex: My first blog post is about..."
        value={post.content || ''}
        name="content"
        onChange={handleChange}
        cols="25"
        rows="10"
      ></textarea>
=======
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
>>>>>>> 6e1b7c42fad63872dcb386918fe58a5c73b3e47e
    </div>
    <br />
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default PostForm
