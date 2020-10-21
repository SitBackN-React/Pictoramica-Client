import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import ImageCreate from '../routes/ImageCreate'
import MyImages from '../routes/MyImages'
import ImageEdit from '../routes/ImageEdit'
import Image from '../routes/Image'
import AllImages from '../routes/AllImages'
import BlogCreate from '../routes/BlogCreate'
import AllBlogs from '../routes/AllBlogs'
import Blog from '../routes/Blog'
import BlogEdit from '../routes/BlogEdit'
import MyBlogs from '../routes/MyBlogs'
import PostCreate from '../routes/PostCreate'
import PostEdit from '../routes/PostEdit'
import Post from '../routes/Post'
import CommentCreate from '../routes/CommentCreate'
import TextEditor from '../routes/TextEditor'
import CommentDelete from '../routes/CommentDelete'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-image' render={() => (
            <ImageCreate msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/my-images' render={() => (
            <MyImages msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/images/:imageId/edit-image' render={(props) => (
            <ImageEdit {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/images/:imageId' render={(props) => (
            <Image {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/all-images' render={(props) => (
            <AllImages {...props} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-blog' render={() => (
            <BlogCreate msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/all-blogs' render={(props) => (
            <AllBlogs {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId' render={(props) => (
            <Blog {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/my-blogs' render={(props) => (
            <MyBlogs {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/edit-blog' render={(props) => (
            <BlogEdit {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/create-post' render={(props) => (
            <PostCreate {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/posts/:postId' render={(props) => (
            <Post {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/posts/:postId/edit-post' render={(props) => (
            <PostEdit {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/posts/:postId/comment-create' render={(props) => (
            <CommentCreate {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/text-editor' render={(props) => (
            <TextEditor {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/posts/:postId/comment-delete' render={(props) => (
            <CommentDelete {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
