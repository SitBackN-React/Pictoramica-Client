import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from './../../apiConfig'
import messages from './../AutoDismissAlert/messages'

import ImageLike from './../shared/ImageLike'

const MyImages = (props) => {
  const [myImages, setMyImages] = useState([])

  const { msgAlert } = props
  // GET request to get all of the images user has created
  useEffect(() => {
    axios({
      url: `${apiUrl}/my-images`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      // sets the response
      .then(res => setMyImages(res.data.images))
      // success message if user is viewing all lists
      .then(() => msgAlert({
        heading: 'Showing all of your images',
        message: messages.showImagesSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setMyImages({ tag: '', caption: '', imageUrl: '', like: 0, forSale: false })
        msgAlert({
          heading: 'Failed to show your images ' + error.message,
          message: messages.showImagesFailure,
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

  const forSale = image => (
    <p style={{ margin: '10px' }}><strong>${image.price}</strong></p>
  )

  // returns the image caption, caption is a link so user can click that directly to get more information other than caption on image (refer to Image.js)
  const imagesJsx = myImages.map(image =>
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

  // the imagesjsx is returned and displayed under a heading.
  // button to Log a New image will take user to create image page.
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>My Images</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', color: 'black' }}>
        {imagesJsx}
      </div>
      <Link to={'/post-image'}>
        <button className="button btn btn-dark btn-lg">Add New Image</button>
      </Link>
    </div>
  )
}

export default MyImages
