import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'
import ImageLike from './ImageLike'

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
      .catch(console.error)
  }, [])

  const imagesJsx = allImages.map(image => <ImageLike {...props} key={image._id} image={image} />)

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
