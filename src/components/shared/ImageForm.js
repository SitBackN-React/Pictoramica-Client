import React from 'react'
import { Link } from 'react-router-dom'

const ImageForm = ({ image, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Image Tag</label>
      <input
        placeholder="Example: Tag names"
        value={image.tag}
        name="tag"
        onChange={handleChange}
      />
    </div>
    <br />
    <div>
      <label>Image url</label>
      <input
        placeholder="Example: Url of the image"
        value={image.imageUrl}
        name="url"
        onChange={handleChange}
      />
    </div>
    <br />
    <button type="submit" className="btn btn-primary">Upload</button>
     <Link to={cancelPath}>
    <button className="btn btn-danger">Cancel</button>
     </Link>
  </form>
  )

  export default ImageForm
