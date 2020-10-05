import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const Images = (props) => {
  // starts the image state as an empty array
  // array will hold the images
  const [images, setImages] = useState([])

  const { msgAlert } = props
  // GET request to get all of the images user has created
  useEffect(() => {
    axios({
      url: `${apiUrl}/images`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    }, [])
      // sets the response
      .then(res => setImages(res.data.images))
      // success message if user is viewing all images
      .then(() => msgAlert({
        heading: 'Showing all of your images',
        message: messages.showImagesSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setImages({ tag: '', caption: '', imageUrl: '', like: 0, forSale: false })
        msgAlert({
          heading: 'Failed to show your images ' + error.message,
          message: messages.showImagesFailure,
          variant: 'danger'
        })
      })
  }, [])
  // returns the image caption, caption is a link so user can click that directly to get more information other than caption on image (refer to Image.js)
  const imagesJsx = images.map(image => (
    <div key={image._id}>
      <div className="image-box">
        {image.imageUrl}
      </div>
      <div>
        <Link to={`/images/${image._id}`}>{image.caption}</Link>
        <div>{image.tag}</div>
      </div>
    </div>
  ))
  // the imagesjsx is returned and displayed under a heading.
  // button to Log a New image will take user to create image page.
  return (
    <div>
      <h4>My Images</h4>
      <div>
        <div>
          {imagesJsx}
        </div>
      </div>
      <Link to={'/create-image'}>
        <button className="button btn btn-primary btn-lg">Log New Image</button>
      </Link>
    </div>
  )
}

export default Images
