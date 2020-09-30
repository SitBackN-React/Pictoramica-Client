import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ImageForm from './../shared/ImageForm'
import messages from './../AutoDismissAlert/messages'

const ImageCreate = (props) => {
  // state of the image starts as empty string, 0, or false
  const [image, setImage] = useState({ tag: '', caption: '', imageUrl: '', like: 0, forSale: false })
  // state starts as null, will be updated once image created
  const [createdImageId, setCreatedImageId] = useState(null)
  // uses handle change and passes in the event param to handle action item
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    // sets the newly created image to an object
    const editedImage = Object.assign({}, image, updatedField)
    setImage(editedImage)
  }
  // submits the change
  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert } = props

    axios({
      url: `${apiUrl}/image`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { image }
    })
    // sets the updated data information to the image id specified
      .then(res => setCreatedImageId(res.data.image._id))
      // success message if image created
      .then(() => msgAlert({
        heading: 'Image created successfully',
        message: messages.createImageSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setImage({ tag: '', caption: '', imageUrl: '', like: 0, forSale: false })
        msgAlert({
          heading: 'Image create failed: ' + error.message,
          message: messages.createImageFailure,
          variant: 'danger'
        })
      })
  }
  // if image is created, take the user to the newly created image
  if (createdImageId) {
    return <Redirect to={`/images/${createdImageId}`} />
  }
  // the form for the user to fill out to create a image. Uses handleSubmit and handleChange
  // cancel path takes user back to all image page.
  return (
    <div>
      <ImageForm
        image={image}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/images'
      />
    </div>
  )
}

export default ImageCreate
