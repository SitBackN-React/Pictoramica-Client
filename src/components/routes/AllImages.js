import React, { useState, useEffect } from 'react'
// import { loadStripe } from "@stripe/stripe-js"
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'
import ImageLike from './ImageLike'
// import ForSale from './ForSale'
// import ProductDisplay from './../App/Checkout'

import messages from './../AutoDismissAlert/messages'
import Checkout from './Checkout'

// const stripePromise = loadStripe("pk_test_51HobYFEybVIVldfc4QmD3NhroakMWJARBgzjLHf5tKx76TBTEmdcgnHrNFGujESH43KIdVM8xDur1JSCtaHqkQan00qUaWN889")

const AllImages = (props) => {
  const [allImages, setAllImages] = useState([])
  // const [imageClicked, setImageClicked] = useState(false)

  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/all-images`,
      method: 'GET'
    })
      .then(res => setAllImages(res.data.images))
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
  
  // Checks to see if the user has a imageLike or not in the image
  const checkUserLike = image => {
    if (image.imageLikes.length === 0) {
      return false
    } else {
      const findImageLike = image.imageLikes.filter(imageLike => imageLike.owner === props.user._id)
      if (findImageLike) {
        return true
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
      if (findImageLike) {
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
        </div>
        <div>
          <Checkout
            image={image}
            {...props}
          />
        </div>
        <ImageLike
          image={image}
          userLiked={checkUserLike(image)}
          imageLikedId={imageLikedId(image)}
          imageLikedCount={imageLikedCount(image)}
          {...props}
          user={props.user}
        />
        <ProductDisplay
          image={image}
          {...props}
          user={props.user}
        />
      </div>
    </div>
  )

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
