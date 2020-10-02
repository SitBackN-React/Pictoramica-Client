import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const Posts = (props) => {
  const [posts, setPosts] = useState([])
  const { msgAlert } = props
  useEffect(() => {
    axios({
      url: `${apiUrl}/posts`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setPosts(res.data.posts))
      .then(() => msgAlert({
        heading: 'Showing all posts',
        message: messages.showPostsSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setPosts({ title: '', content: '' })
        msgAlert({
          heading: 'Failed to show all posts ' + error.message,
          message: messages.showPostsFailure,
          variant: 'danger'
        })
      })
  }, [])
  const postsJsx = posts.map(post => (
    <div key={post._id}>
      <div>
        <Link to={`/blogs/${props.match.params.blogId}/posts/${post._id}`}>{post.title}</Link>
      </div>
    </div>
  ))

  return (
    <div>
      <h1>My Posts</h1>
      <br />
      <div>
        {postsJsx}
      </div>
      <Link to={'/create-post'}>
        <button variant="primary">Add Post</button>
      </Link>
    </div>
  )
}

export default Posts
