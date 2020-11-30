import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import CommentForm from './../shared/CommentForm'
import messages from './../AutoDismissAlert/messages'

const CommentCreate = props => {
  const [comment, setComment] = useState({
    remark: ''
  })
  // const [createdCommentId, setCreatedCommentId] = useState(null)
  const [createdComment, setCreatedComment] = useState(false)
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedComment = Object.assign({}, comment, updatedField)
    setComment(editedComment)
  }

  console.log(props)

  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert } = props

    const postId = `${props.match.params.postId}`
    console.log(postId)

    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}/comments`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { comment }
    })
      .then(res => {
        console.log(res)
        return res
      })
      // .then(res => {
      //   const postArray = res.data.blog.posts
      //   const findPostIndexNum = function (postArray) {
      //     for (let i = 0; i < postArray.length; i++) {
      //       if (postArray[i]._id === postId) {
      //         return i
      //       } else {
      //         return -1
      //       }
      //     }
      //   }
      //   const postIndexNum = findPostIndexNum(postArray)
      //   const mostRecentCommentIndexNum = res.data.blog.posts[postIndexNum].comments.length - 1
      //   const newCommentId = res.data.blog.posts[postIndexNum].comments[mostRecentCommentIndexNum]._id
      //   return newCommentId
      // })
      // .then(newCommentId => setCreatedCommentId(newCommentId))
      .then(newCommentId => setCreatedComment(true))
      .then(() => msgAlert({
        heading: 'Created comment successfully',
        message: messages.createCommentSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setComment({ remark: '' })
        msgAlert({
          heading: 'Create comment failed: ' + error.message,
          message: messages.createCommentFailure,
          variant: 'danger'
        })
      })
  }
  // console.log(createdCommentId)
  console.log(props)
  if (createdComment) {
    return <Redirect to={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}`}/>
  }

  return (
    <div>
      <CommentForm
        comment={comment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/blogs/${props.match.params.blogId}/posts/${props.match.params.postId}`}
      />
    </div>
  )
}

export default CommentCreate
