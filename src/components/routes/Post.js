
import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'
import CommentDelete from './CommentDelete'

const Post = props => {
  const [post, setPost] = useState(null)
  const [deleted, setDeleted] = useState(false)
  // const [removed, setRemoved] = useState(false)
  // const [setComment] = useState(null)
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
        setPost({ title: '', content: '' })
        msgAlert({
          heading: 'Failed to show post' + error.message,
          message: messages.showPostFailure,
          variant: 'danger'
        })
      })
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Post Deleted',
        message: messages.deletePostSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setPost({ title: '', content: '' })
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deletePostFailure,
          variant: 'danger'
        })
      })
  }

  // const remove = (id) => {
  //   axios({
  //     url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/comments/${id}`,
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Token token=${props.user.token}`
  //     }
  //   })
  //     .then(() => setRemoved(true))
  //     .then(() => msgAlert({
  //       heading: 'Comment Deleted',
  //       message: messages.deleteCommentSuccess,
  //       variant: 'success'
  //     }))
  //     .catch(error => {
  //       // setComment({ remark: '' })
  //       msgAlert({
  //         heading: 'Failed to delete' + error.message,
  //         message: messages.deleteCommentFailure,
  //         variant: 'danger'
  //       })
  //     })
  // }

  if (!post) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect to={`/blogs/${props.match.params.blogId}`} />
    )
  }
  // if (removed) {
  //   return (
  //     <Redirect to={`/blogs/${props.match.params.blogId}`} />
  //   )
  // }

  const commentsJsx = post.comments.map(comment =>
    <CommentDelete {...props}
    <li key={comment._id}>
      <p>{comment.remark}</p>
      <button className="btn btn-danger" onClick={() => {
        handleClick()
      }}>Delete Comment</button>
    </li>
    />
  )

  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      <div className="post-display">
        {commentsJsx}
      </div>
      <div>
        <Link to={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/comment-create`}>
          <button className="btn btn-primary">Add Comment</button>
        </Link>
        <button className="btn btn-danger" onClick={destroy}>Delete Post</button>
        <Link to={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/edit-post`}>
          <button className="button btn btn-warning">Edit Post</button>
        </Link>
      </div>
      <div>
        <Link to={`/blogs/${props.match.params.blogId}`}>Back to posts</Link>
      </div>
    </div>
  )
}

export default Post
