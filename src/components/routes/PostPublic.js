import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PostLike from './PostLike'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'
import Jumbotron from 'react-bootstrap/Jumbotron'
import CommentCreate from './CommentCreate'

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
  // Checks to see if the user has a postLike or not in the post
  const checkUserLike = post => {
    if (post.postLikes.length === 0) {
      return false
    } else {
      const findPostLike = post.postLikes.filter(postLike => postLike.owner === props.user._id)
      if (findPostLike) {
        if (findPostLike.length === 0) {
          return false
        }
        return true
      } else {
        return false
      }
    }
  }
  console.log()
  // Looks for the postLike id in the post
  // if there is one that the user created, return that 'id'
  // if not, return '0'
  const postLikedId = post => {
    if (post.postLikes.length === 0) {
      return '0'
    } else {
      const findPostLike = post.postLikes.filter(postLike => postLike.owner === props.user._id)
      if (findPostLike.length === 0) {
        return '0'
      } else if (findPostLike) {
        const postLikeId = findPostLike[0]._id
        return postLikeId
      } else {
        return '0'
      }
    }
  }
  // Determines how many postLikes there are in total for each post
  const postLikedCount = post => {
    return post.postLikes.length
  }
  return (
    <div>
      <Jumbotron fluid>
        <div className="blabla">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <div className="postlikeonpost">
            <PostLike
              post={post}
              userLiked={checkUserLike(post)}
              postLikedId={postLikedId(post)}
              postLikedCount={postLikedCount(post)}
              {...props}
              user={props.user}
            />
          </div>
        </div>
      </Jumbotron>
      <div className="comments-display">
        <p>Comments</p>
        {commentsJsx}
      </div>
      <div>
        <CommentCreate
          {...props}
        />
      </div>
      <div>
        <Link to={`/blogs/${props.match.params.blogId}`}>Back to posts</Link>
      </div>
    </div>
  )
}

export default PostPublic
