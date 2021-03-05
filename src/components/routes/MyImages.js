import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'
import ImageLike from './ImageLike'

const MyImages = (props) => {
  // starts the image state as an empty array
  // array will hold the images
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
  // Checks to see if the user has a imageLike or not in the image
  const checkUserLike = image => {
    if (image.imageLikes.length === 0) {
      return false
    } else {
      const findImageLike = image.imageLikes.filter(imageLike => props.user._id === imageLike.owner)
      // console.log('image: ', image)
      // console.log('userId: ', props.user._id)
      // console.log(findImageLike)
      // console.log(typeof findImageLike)
      // console.log(findImageLike ? 'yes' : 'no')
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
      console.log(findImageLike)
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

  // returns the image caption, caption is a link so user can click that directly to get more information other than caption on image (refer to Image.js)
  const imagesJsx = myImages.map(image => (
    <div key={image._id} style={{ margin: '10px' }}>
      <Card>
        <Link to={`/images/${image._id}`}>
          <Card.Img variant="top" src={image.imageUrl} style={{ width: '180px', height: '180px' }} />
          <Card.Body style={{ color: 'black' }}>
            <Card.Text>{image.caption}</Card.Text>
            <Card.Text>{image.tag}</Card.Text>
          </Card.Body>
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
  ))
  // the imagesjsx is returned and displayed under a heading.
  // button to Log a New image will take user to create image page.
  return (
    <div style={{ textAlign: 'center', color: 'white' }}>
      <h4>My Images</h4>
      <div>
        <CardDeck style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {imagesJsx}
        </CardDeck>
      </div>
      <Link to={'/post-image'}>
        <button className="button btn btn-dark btn-lg">Add New Image</button>
      </Link>
    </div>
  )
}

export default MyImages
