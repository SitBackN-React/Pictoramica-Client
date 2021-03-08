import React, { useState, useEffect } from 'react'
// import { loadStripe } from "@stripe/stripe-js"
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import axios from 'axios'

import apiUrl from './../../apiConfig'
import ImageLike from './../shared/ImageLike'
// import ForSale from './ForSale'
// import ProductDisplay from './../App/Checkout'

import messages from './../AutoDismissAlert/messages'
// import Checkout from './Checkout'

// const stripePromise = loadStripe("pk_test_51HobYFEybVIVldfc4QmD3NhroakMWJARBgzjLHf5tKx76TBTEmdcgnHrNFGujESH43KIdVM8xDur1JSCtaHqkQan00qUaWN889")

const AllImagesHomePage = (props) => {
  const [setAllImages] = useState([])
  const [recentImages, setRecentImages] = useState([])

  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/all-images`,
      method: 'GET'
    })
      .then(res => {
        // setAllImages(res.data.images)
        if (res.data.images.length > 0) {
          const firstRecentImage = res.data.images.shift()
          if (res.data.images.length > 0) {
            const secondRecentImage = res.data.images.shift()
            setRecentImages([firstRecentImage, secondRecentImage])
          } else {
            setRecentImages([firstRecentImage])
          }
        }
      })
      .then(() => msgAlert({
        heading: 'Showing all images',
        message: messages.showAllImagesSuccess,
        variant: 'primary'
      }))
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

  // Checks to see if the user has a imageLike or not in the image
  const checkUserLike = image => {
    if (image.imageLikes.length === 0) {
      return false
    } else {
      const findImageLike = image.imageLikes.filter(imageLike => props.user._id === imageLike.owner)
      if (findImageLike) {
        if (findImageLike.length === 0) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }
  }

  // Looks for the imageLike id in the image
  // if there is one that the user created, return that 'id'
  // if not, return '0'
  const imageLikedId = image => {
    if (image.imageLikes.length === 0) {
      return '0'
    } else {
      const findImageLike = image.imageLikes.filter(imageLike => imageLike.owner === props.user._id)
      if (findImageLike.length === 0) {
        return '0'
      } else if (findImageLike) {
        const imageLikeId = findImageLike[0]._id
        return imageLikeId
      } else {
        return '0'
      }
    }
  }

  // Determines how many imageLikes there are in total for each image
  const imageLikedCount = image => {
    return image.imageLikes.length
  }

  const imagesJsx = recentImages.map(image =>
    <div key={image._id} style={{ margin: '10px' }}>
      <Card>
        <Link to={`/images/${image._id}`}>
          <Card.Img variant="top" src={image.imageUrl} style={{ width: '224px', height: '180px' }} />
        </Link>
        <ImageLike
          image={image}
          userLiked={checkUserLike(image)}
          imageLikedId={imageLikedId(image)}
          imageLikedCount={imageLikedCount(image)}
          {...props}
          user={props.user}
        />
      </Card>
    </div>
  )

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Recently Shared</h2>
      <div>
        <CardDeck style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
          {imagesJsx}
        </CardDeck>
      </div>
    </div>
  )
}

export default AllImagesHomePage
