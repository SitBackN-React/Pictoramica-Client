import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const PostLike = (props) => {
  const [postLiked, setPostLiked] = useState({
    title: props.post.title,
    content: props.post.content,
    like: props.post.like
  })

  console.log(props)

  const handleChange = (event) => setPostLiked((e) => {
    const postLikedCount = postLiked + 1
    console.log(setPostLiked)
    return {
      title: props.post.title,
      content: props.post.content,
      like: postLikedCount
    }
  })
  console.log(props)

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/post/${props.post._id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { post: {
        title: props.post.title,
        content: props.post.content,
        like: postLiked.like } }
    })
      .catch(console.error)
  }

  const commentsJsx = props.post.comments.map(comment => (
    <li className="comment-list" key={comment._id}>
      <p>Posted By: {props.user._id}</p>
      <p>{comment.remark}</p>
    </li>
  ))

  return (
    <div key={props.post._id}>
      <div>
        <p>{props.post.title}</p>
      </div>
      <div>
        <p>{props.post.content}</p>
      </div>
      <div className="post-display">
        {commentsJsx}
      </div>
      <div>
        <p>Like:
          <input className="post-like-box" type="button" value={ postLiked.like ? '✔' : '' } onClick={(event) => {
            handleChange(event)
            handleSubmit(event)
          } } />
        </p>
      </div>
    </div>
  )
}
export default PostLike
