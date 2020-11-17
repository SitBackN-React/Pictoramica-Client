import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const PostPublic = props => {
  const [post, setPost] = useState(null)

  const { msgAlert } = props

  console.log(props)

  useEffect(() => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => setPost(res.data.post))
      .then(() => msgAlert({
        heading: 'Showing selected post',
        message: messages.showPostSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setPost({ title: '', content: '', like: 0 })
        msgAlert({
          heading: 'Failed to show post' + error.message,
          message: messages.showPostFailure,
          variant: 'danger'
        })
      })
  }, [])

  if (!post) {
    return <p>Loading...</p>
  }
  const commentsJsx = post.comments.map(comment => (
    <li className="comment-list" key={comment._id}>
      <p>Posted By: {props.user._id}</p>
      <p>{comment.remark}</p>
    </li>
  ))

  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      <div className="post-display">
        {commentsJsx}
      </div>
      <div>
        <Link to={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/comment-create`}>
          <button className="btn btn-primary">Add Comment now</button>
        </Link>
      </div>
      <div>
        <Link to={`/blogs/${props.match.params.blogId}`}>Back to posts</Link>
      </div>
    </div>
  )
}

export default PostPublic
