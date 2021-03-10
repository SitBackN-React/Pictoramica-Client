import React, { useState, useEffect } from 'react'
// import { loadStripe } from "@stripe/stripe-js"
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'
import ImageLike from './../shared/ImageLike'
// import AddToCart from './AddToCart'
// import ForSale from './ForSale'
// import ProductDisplay from './../App/Checkout'

import messages from './../AutoDismissAlert/messages'

// const stripePromise = loadStripe("pk_test_51HobYFEybVIVldfc4QmD3NhroakMWJARBgzjLHf5tKx76TBTEmdcgnHrNFGujESH43KIdVM8xDur1JSCtaHqkQan00qUaWN889")

const AllImages = (props) => {
  const [allImages, setAllImages] = useState([])
  // const [imageClicked, setImageClicked] = useState(false)

  const { msgAlert } = props
  console.log(props)
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
    const tags = imageTag.split(' ').map(tag =>
      <p key={tag}>
        <Link to={{
          pathname: '/all-images/tag',
          aboutProps: {
            tag: { tag }
          }
        }}
        style={{ color: 'black', fontSize: '14px' }}>
          #{tag}
        </Link>
      </p>
    )
    return tags
  }

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

  // const forSale = image => (
  //   <div style={{ textAlign: 'center', paddingBottom: '5px' }}>
  //     For Sale
  //     <AddToCart
  //       selectedItem={image}
  //       {...props}
  //       price={image.price}
  //     />
  //   </div>
  // )

  const forSale = image => (
    <p style={{ margin: '10px' }}><strong>${image.price}</strong></p>
  )

  const imagesJsx = allImages.map(image =>
    <div key={image._id} style={{ margin: '10px', borderRadius: '20px', border: '2px solid black' }}>
      <Link to={`/images/${image._id}`} style={{ margin: '0px' }}>
        <img src={image.imageUrl} style={{ width: '180px', height: '180px', borderRadius: '20px 20px 0px 0px' }} />
      </Link>
      <div style={{ background: 'white', color: 'black', width: '180px', borderRadius: '0px 0px 20px 20px' }}>
        <h6 style={{ paddingTop: '10px' }}>{image.caption}</h6>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>{tagArray(image.tag)}</div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', color: 'black' }}>
          <div>{image.forSale === true ? forSale(image) : <div></div>}</div>
          <div>
            <ImageLike
              image={image}
              userLiked={checkUserLike(image)}
              imageLikedId={imageLikedId(image)}
              imageLikedCount={imageLikedCount(image)}
              {...props}
              user={props.user}
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>All Images</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', color: 'black' }}>
        {imagesJsx}
      </div>
    </div>
  )
}

export default AllImages
