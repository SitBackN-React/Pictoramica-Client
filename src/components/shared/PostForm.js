import React from 'react'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const PostForm = ({ post, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Blog Post Title</label>
      <input
        placeholder="Ex: What I have to say"
        value={post.title || ''}
        name="title"
        onChange={handleChange}
        size="25"
        autoFocus
      />
    </div>
    <div>
      <label>Post Content</label>
      <textarea
        placeholder="Ex: I believe that..."
        value={post.content || ''}
        name="content"
        onChange={handleChange}
        cols="25"
        rows="10"
      ></textarea>
    </div>
    <br />
    <ReactQuill theme="snow" />
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default PostForm
