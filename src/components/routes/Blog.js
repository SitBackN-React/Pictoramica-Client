import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'
import PostLike from './PostLike'
const Blog = (props) => {
  const [blog, setBlog] = useState(null)
  // const [userLiked, setUserLiked] = useState([])
  const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBlog(res.data.blog))
      .then(() => msgAlert({
        heading: 'Showing selected blog',
        message: messages.showBlogSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setBlog({ title: '' })
        msgAlert({
          heading: 'Failed to show blog' + error.message,
          message: messages.showBlogFailure,
          variant: 'danger'
        })
      })
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.blogId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Blog Deleted',
        message: messages.deleteBlogSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setBlog({ title: '' })
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deleteBlogFailure,
          variant: 'danger'
        })
      })
  }

  if (!blog) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect to={'/all-blogs'} />
    )
  }
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
  const bgColors = ['Primary',
    'Secondary',
    'Success',
    'Danger',
    'Warning',
    'Info',
    'Light',
    'Dark'
  ]
  const bgRandom = Math.floor(Math.random() * 8)
  // if user owns the post

  const postsOwnerJsx = blog.posts.map(post => (
    <div key={post._id}>
      <Card border={bgColors[bgRandom].toLowerCase()} style={{ margin: '10px', borderWidth: '5px' }}>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>
            {post.content}
          </Card.Text>
          <Link to={`/blogs/${props.match.params.blogId}/posts/${post._id}`}>
            <Button variant="outline-secondary">Read more</Button>
          </Link>
          <PostLike
            post={post}
            userLiked={checkUserLike(post)}
            postLikedId={postLikedId(post)}
            postLikedCount={postLikedCount(post)}
            {...props}
            user={props.user}
          />
        </Card.Body>
      </Card>
    </div>
  ))

  // if user does not own the post
  const postsPublicJsx = blog.posts.map(post => (
    <div key={post._id}>
      <Card border={bgColors[bgRandom].toLowerCase()} style={{ margin: '10px', borderWidth: '5px' }}>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>
            {post.content}
          </Card.Text>
          <Link to={`/blogs/${props.match.params.blogId}/posts/${post._id}/post-public`}>
            <Button variant="outline-secondary">Read more</Button>
          </Link>
          <PostLike
            post={post}
            userLiked={checkUserLike(post)}
            postLikedId={postLikedId(post)}
            postLikedCount={postLikedCount(post)}
            {...props}
            user={props.user}
          />
        </Card.Body>
      </Card>
    </div>
  ))

  console.log(blog.posts, 'the blog')
  //  final return
  return (
    <div style={{ textAlign: 'center' }}>
      <h4>{blog.title}</h4>
      <div>
        <CardDeck style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {props.user._id === blog.owner ? (
            postsOwnerJsx
          ) : (
            postsPublicJsx
          )}
        </CardDeck>
      </div>
      <div>
        {props.user._id === blog.owner ? (
          <Link to={`/blogs/${props.match.params.blogId}/create-post`}>
            <button className="btn btn-primary" style={{ display: 'inline' }}>Create New Post</button>
          </Link>
        ) : (
          <button style={{ display: 'none' }}></button>
        )}
        {props.user._id === blog.owner ? (
          <button className="btn btn-danger" onClick={destroy} style={{ display: 'inline' }}>Delete Blog</button>
        ) : (
          <button style={{ display: 'none' }}></button>
        )}
        {props.user._id === blog.owner ? (
          <Link to={`/blogs/${props.match.params.blogId}/edit-blog`}>
            <button className="button btn btn-warning" style={{ display: 'inline' }}>Edit Blog</button>
          </Link>
        ) : (
          <button style={{ display: 'none' }}></button>
        )}
      </div>
      <div>
        <button className="btn btn-success" type="button" onClick={() => props.history.goBack()}>
      Go back
        </button>
      </div>
    </div>
  )
}

export default Blog
