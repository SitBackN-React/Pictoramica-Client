
import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const Post = props => {
  const [post, setPost] = useState(null)
  const [deleted, setDeleted] = useState(false)
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
  console.log(props)
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

  const remove = () => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/comments/`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        const postId = `${props.match.params.postId}`
        const postArray = res.data.blog.posts
        const findPostIndexNum = function (postArray) {
          for (let i = 0; i < postArray.length; i++) {
            if (postArray[i]._id === postId) {
              return i
            } else {
              return -1
            }
          }
        }
        const postIndexNum = findPostIndexNum(postArray)
        const commentId = `${props.match.params.commentId}`
        const commentArray = res.data.blog.postIndexNum.comments
        const findCommentIndexNum = function () {
          for (let i = 0; i < commentArray.length; i++) {
            if (commentArray[i]._id === commentId) {
              return i
            } else {
              return -1
            }
          }
        }
        const commentIndexNum = findCommentIndexNum(commentArray)
        const selectedCommentId = res.data.blog.posts[commentIndexNum].comments.length - 1
        const deletedCommentId = res.data.blog.posts[postIndexNum].comments[selectedCommentId]._id
        // const mostRecentCommentIndexNum = res.data.blog.posts[postIndexNum].comments.length - 1
        // const deletedCommentId = res.data.blog.posts[postIndexNum].comments[mostRecentCommentIndexNum]._id
        return deletedCommentId
      })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Comment Deleted',
        message: messages.deleteCommentSuccess,
        variant: 'success'
      }))
      .catch(error => {
        // setComment({ remark: '' })
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deleteCommentFailure,
          variant: 'danger'
        })
      })
  }

  if (!post) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect to={`/blogs/${props.match.params.blogId}`} />
    )
  }
  console.log(post)
  const commentsJsx = post.comments.map(comment => (
    <li key={comment._id}>
      <Link to={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/comments/${comment._id}`}>{comment.remark}</Link>
      <button className="btn btn-danger" onClick={remove}>Delete Comment</button>
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
