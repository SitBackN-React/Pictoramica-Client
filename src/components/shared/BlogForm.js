import React from 'react'
import { Link } from 'react-router-dom'

const BlogForm = ({ blog, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit} style={{ color: 'white' }}>
    <div>
      <label>Blog Title</label>
      <input
        placeholder="Example: My thoughts"
        value={blog.title}
        name="title"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Blog Description</label>
      <input
        placeholder="A Blog about Sustainability!"
        value={blog.description}
        name="description"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Select Blog Tile Border Color</label>
      <br />
      <div>
        <input
          type="radio"
          value={'primary'}
          name="backgroundId"
          onChange={handleChange}
        />
        <p>Blue</p>
      </div>
      <div>
        <input
          type="radio"
          value={'secondary'}
          name="backgroundId"
          onChange={handleChange}
        />
        <p>Gray</p>
      </div>
      <div>
        <input
          type="radio"
          value={'success'}
          name="backgroundId"
          onChange={handleChange}
        />
        <p>Green</p>
      </div>
      <div>
        <input
          type="radio"
          value={'danger'}
          name="backgroundId"
          onChange={handleChange}
        />
        <p>Red</p>
      </div>
      <div>
        <input
          type="radio"
          value={'warning'}
          name="backgroundId"
          onChange={handleChange}
        />
        <p>Yellow</p>
      </div>
      <div>
        <input
          type="radio"
          value={'info'}
          name="backgroundId"
          onChange={handleChange}
        />
        <p>Turquoise</p>
      </div>
      <div>
        <input
          type="radio"
          value={'light'}
          name="backgroundId"
          onChange={handleChange}
        />
        <p>Light Gray</p>
      </div>
      <div>
        <input
          type="radio"
          value={'dark'}
          name="backgroundId"
          onChange={handleChange}
        />
        <p>Dark Gray</p>
      </div>
    </div>
    <br />
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default BlogForm
