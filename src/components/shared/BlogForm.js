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
          name="borderColor"
          onChange={handleChange}
        />
        <p>Blue</p>
      </div>
      <div>
        <input
          type="radio"
          value={'secondary'}
          name="borderColor"
          onChange={handleChange}
        />
        <p>Gray</p>
      </div>
      <div>
        <input
          type="radio"
          value={'success'}
          name="borderColor"
          onChange={handleChange}
        />
        <p>Green</p>
      </div>
      <div>
        <input
          type="radio"
          value={'danger'}
          name="borderColor"
          onChange={handleChange}
        />
        <p>Red</p>
      </div>
      <div>
        <input
          type="radio"
          value={'warning'}
          name="borderColor"
          onChange={handleChange}
        />
        <p>Yellow</p>
      </div>
      <div>
        <input
          type="radio"
          value={'info'}
          name="borderColor"
          onChange={handleChange}
        />
        <p>Turquoise</p>
      </div>
      <div>
        <input
          type="radio"
          value={'light'}
          name="borderColor"
          onChange={handleChange}
        />
        <p>Light Gray</p>
      </div>
      <div>
        <input
          type="radio"
          value={'dark'}
          name="borderColor"
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
