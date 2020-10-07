import React from 'react'
import { Link } from 'react-router-dom'

const CommentForm = ({ comment, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Comment</label>
      <textarea
        placeholder="Ex: I believe that..."
        value={comment.remark || ''}
        name="remark"
        onChange={handleChange}
        cols="25"
        rows="10"
        autoFocus
      ></textarea>
    </div>
    <br />
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default CommentForm
