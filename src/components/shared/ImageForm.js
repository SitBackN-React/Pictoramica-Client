import React from 'react'
import { Link } from 'react-router-dom'

const ImageForm = ({ image, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Image Caption</label>
      <input
        type="text"
        placeholder="Example: My sunset painting"
        value={image.caption}
        name="caption"
        onChange={handleChange}
        size="25"
      />
    </div>
    <div>
      <label>Image Tag</label>
      <input
        type="text"
        placeholder="Example: #sunset #painting"
        value={image.tag}
        name="tag"
        onChange={handleChange}
        size="25"
      />
    </div>
    <br />
    <div>
      <label>Image Url</label>
      <input
        type="text"
        placeholder="Example: /images/sunset.jpg"
        value={image.imageUrl}
        name="imageUrl"
        onChange={handleChange}
        size="25"
      />
    </div>
    <br />
    <button type="submit" className="btn btn-primary">Upload</button>
    <Link to='/my-images'>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default ImageForm
