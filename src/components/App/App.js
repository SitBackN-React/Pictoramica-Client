import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
// import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
// import image from 'Image.js'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
// import ImageCreate from '../routes/ImageCreate'
import MyImages from '../routes/MyImages'
import EditS3Image from '../routes/ImageEdit'
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
import PostPublic from '../routes/PostPublic'
import CommentCreate from '../routes/CommentCreate'
import TextEditor from '../routes/TextEditor'
import CommentDelete from '../routes/CommentDelete'
import HomePage from '../routes/HomePage'
import UploadS3Image from '../routes/ImageCreate'
import ImageTag from '../routes/ImageTag'
import Cart from '../routes/Cart'
// import Application from './Checkout.js'

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// )

// const CheckoutForm = () => {
//   const stripe = useStripe()
//   const elements = useElements()
//
//   const handleSubmit = async (event) => {
//     // Block native form submission
//     event.preventDefault()
//
//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded
//       return
//     }
//
//     // Get a reference to a mounted CardElement.
//     const cardElement = elements.getElement(CardElement)
//
//     // Use your card Element with other Stripe.js APIs
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement
//     })
//
//     if (error) {
//       console.log('[error], error')
//     } else {
//       console.log('[PaymentMethod]', paymentMethod)
//     }
//   }
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: '16px',
//               color: '#424770',
//               '::placeholder': {
//                 color: '#aab7c4'
//               }
//             },
//             invalid: {
//               color: '#9e2146'
//             }
//           }
//         }}
//       />
//       <button type="submit" disable={!stripe}>
//           Pay
//       </button>
//     </form>
//   )
// }

// Call 'loadStripe' outside of the component's render to avoid recreating 'Stripe'
// object on every render
// const stripePromise = loadStripe('pk_test_51HobYFEybVIVldfc4QmD3NhroakMWJARBgzjLHf5tKx76TBTEmdcgnHrNFGujESH43KIdVM8xDur1JSCtaHqkQan00qUaWN889')

// const ProductDisplay = ({ handleClick }) => (
//   <section>
//     <div className="product">
//       <img
//         src={image.imageUrl}
//         alt={image.caption}
//       />
//       <div className="description">
//         <h3>image.caption</h3>
//         <h5>[amount]</h5>
//       </div>
//     </div>
//     <button id="checkout-button" role="link" onClick={handleClick}>
//       Checkout
//     </button>
//   </section>
// )
//
// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// )

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],
      image: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  setImage = image => this.setState({ image })
  clearArt = () => this.setState({ image: null })

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
        <AuthenticatedRoute user={user} path='/home-page' render={(props) => (
          <HomePage {...props} msgAlert={this.msgAlert} user={user} />
        )} />
        <main className="container">
          <Route exact path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/post-image' render={(props) => (
            <UploadS3Image
              {...props}
              msgAlert={this.msgAlert}
              setImage={this.setImage}
              user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/my-images' render={() => (
            <MyImages msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/images/:imageId/edit-image' render={(props) => (
            <EditS3Image {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/images/:imageId' render={(props) => (
            <Image {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/all-images' render={(props) => (
            <AllImages {...props} msgAlert={this.msgAlert} user={user} />
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
            <Post {...props} token={this.state.user ? this.state.user.token : null} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/posts/:postId/post-public' render={(props) => (
            <PostPublic {...props} token={this.state.user ? this.state.user.token : null} msgAlert={this.msgAlert} user={user}/>
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
          <AuthenticatedRoute user={user} path='/all-images/tag' render={(props) => (
            <ImageTag {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/cart' render={(props) => (
            <Cart {...props} msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

// export default function checkout() {
//   const [message, setMessage] = useState("")
//
//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search)
//
//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.")
//     }
//
//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready"
//       )
//     }
//   }, [])
//
//   const handleClick = async (event) => {
//     const stripe = await stripePromise
//
//     const response = await fetch("/create-checkout-session", {
//       method: "POST"
//     })
//
//     const session = await response.json()
//
//     // When the customer clicks on the button, redirect them to Checkout
//     const result = await stripe.redirectToCheckout({
//       sessionId: session.id
//     })
//
//     if (result.error) {
//       // If `redirectToCheckout` fails due to a browser or network
//       // error, display the localized error message to your customer
//       // using `result.error.message`
//     }
//   }
//
//   return message ? (
//     <Message message={message} />
//   ) : (
//     <ProductDisplay handleClick={handleClick} />
//   )
// }

export default App
