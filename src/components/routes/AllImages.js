import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'
import ImageLike from './ImageLike'
import ForSale from './ForSale'

import messages from './../AutoDismissAlert/messages'

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
