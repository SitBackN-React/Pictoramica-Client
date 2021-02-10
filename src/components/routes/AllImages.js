import React, { useState, useEffect } from 'react'
// import { loadStripe } from "@stripe/stripe-js"
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'
import ImageLike from './ImageLike'
import ForSale from './ForSale'
import ProductDisplay from './../App/Checkout'

import messages from './../AutoDismissAlert/messages'

// const stripePromise = loadStripe("pk_test_51HobYFEybVIVldfc4QmD3NhroakMWJARBgzjLHf5tKx76TBTEmdcgnHrNFGujESH43KIdVM8xDur1JSCtaHqkQan00qUaWN889")

const AllImages = (props) => {
  const [allImages, setAllImages] = useState([])

  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/all-images`,
      method: 'GET'
    })
      .then(res => setAllImages(res.data.images))
      // .then(() => msgAlert({
      //   heading: 'Showing all images',
      //   message: messages.showAllImagesSuccess,
      //   variant: 'primary'
      // }))
      .catch(error => {
        setAllImages([])
        // message if images failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.showAllImagesFailure,
          variant: 'danger'
        })
      })
  }, [])

  const tagArray = (imageTag) => {
    const tags = imageTag.split(', ').map(tag =>
      <p key={tag}>
        <Link to={{
          pathname: '/all-images/tag',
          aboutProps: {
            tag: { tag }
          }
        }}>
          {tag}
        </Link>
      </p>
    )
    return tags
  }

  const styles = {
    imageBox: { width: '60%', height: '60%', border: '2px solid #000000' }
  }

  const imagesJsx = allImages.map(image =>
    <div key={image._id}>
      <div style={styles.imageBox}>
        <Link to={`/images/${image._id}`}>
          <img style={{ width: '100%' }} src={image.imageUrl} />
        </Link>
      </div>
      <div>
        <p>Caption: {image.caption}</p>
        <div>Tag: {tagArray(image.tag)}</div>
        <div className="like-button">
          <ImageLike
            image={image}
            {...props}
          />
        </div>
        <div>For Sale:
          <ForSale
            image={image}
            {...props}
            user={props.user}
          />
        </div>
        <ProductDisplay
          image={image}
          {...props}
          user={props.user}
        />
      </div>
    </div>
  )

  // const ProductDisplay = ({ handleClick }) => (
  //   <section>
  //     <div className="product">
  //     <img
  //       src={image.imageUrl}
  //       alt={image.caption}
  //     />
  //     <div className="description">
  //       <h3>{image.caption}</h3>
  //       <h5>$20.00</h5>
  //     </div>
  //     </div>
  //     <button id="checkout-button" role="link" onClick={handleClick}>
  //     Checkout
  //     </button>
  //   </section>
  // )

  // const Message = ({ message }) => (
  //   <section>
  //     <p>{message}</p>
  //   </section>
  // )

  return (
    <div>
      <h4>All Images</h4>
      <div>
        {imagesJsx}
      </div>
    </div>
  )
}

export default AllImages

// const [message, setMessage] = useState("")

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
// //   return message ? (
// //     <Message message={message} />
// //   ) : (
// //     <ProductDisplay handleClick={handleClick} />
// //   )
// // }
