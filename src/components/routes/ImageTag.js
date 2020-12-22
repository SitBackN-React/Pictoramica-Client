import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const ImageTag = props => {
  const [allImages, setAllImages] = useState([])

  const selectedTagName = props.location.aboutProps.tag.tag
  const lowercaseSelectedTagName = selectedTagName.toLowerCase()

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

  const tagMatch = (image) => {
    const imageTag = image.tag
    const lowercaseTags = imageTag.toLowerCase()
    const tags = lowercaseTags.split(', ')
    const checkTags = tags.includes(lowercaseSelectedTagName)

    if (checkTags) {
      return image.imageUrl
    }
  }

  const imagesJsx = allImages.map(image =>
    <div key={image._id}>
      <img style={{ width: '40%', marginBottom: '10px' }} src={tagMatch(image)} />
    </div>
  )

  return (
    <div>
      <h1>HELLO You have reached the Image Tag Page</h1>
      <p>The tag that you have clicked on is <strong><u>{selectedTagName}</u></strong></p>
      <p>Images with the same tag name will appear here</p>
      <div>{imagesJsx}</div>
    </div>
  )
}

export default ImageTag