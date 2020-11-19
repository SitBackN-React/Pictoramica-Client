import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'
import ImageLike from './ImageLike'
import ForSale from './ForSale'

import messages from './../AutoDismissAlert/messages'

const AllImages = (props) => {
  const [allImages, setAllImages] = useState([])

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

  console.log('props ', props)
  console.log('allImages ', allImages)

  const imagesJsx = allImages.map(image =>
    <div key={image._id}>
      <div className="image-box">
        <Link to={`/images/${image._id}`}>{image.imageUrl}</Link>
      </div>
      <div>
        <p>Caption: {image.caption}</p>
        <p>Tag: {image.tag}</p>
        <p className="like-button">
          <ImageLike
            image={image}
            {...props}
          />
        </p>
        <p>For Sale:
          <ForSale
            image={image}
            {...props}
          />
        </p>
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
