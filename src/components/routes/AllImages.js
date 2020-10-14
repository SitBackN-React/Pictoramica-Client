import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const AllImages = (props) => {
  const [allImages, setAllImages] = useState([])

  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/all-images`,
      method: 'GET'
    }, [])
      .then(res => setAllImages(res.data.images))
      .then(() => msgAlert({
        heading: 'Showing all images',
        message: messages.showAllImagesSuccess,
        variant: 'primary'
      }))
      .catch(console.error)
  })

  const imagesJsx = allImages.map(image => (
    <div className="list-group" key={image.imageUrl}>
      <ul>
        <li className="list-group-item">
          {/* // <div>{`/images/${image._id}`}</div> */}
          <div>
              Url: {image.imageUrl}
          </div>
          <div>
            Caption: {image.caption}
          </div>
          <div>
            Tag: {image.tag}
          </div>
        </li>
      </ul>
    </div>
  ))

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
