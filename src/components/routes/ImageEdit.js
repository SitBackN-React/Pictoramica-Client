import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ImageForm from '../shared/ImageForm'
import messages from './../AutoDismissAlert/messages'

const ImageEdit = props => {
  const [image, setImage] = useState({
    tag: '',
    caption: '',
    imageUrl: '',
    like: 0,
    forSale: false
  })
  const [updated, setUpdated] = useState(false)
  const { msgAlert } = props
  //  functions like a componentDidMount
  useEffect(() => {
    axios({
      url: `${apiUrl}/images/${props.match.params.imageId}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setImage(res.data.image))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setImage(prevImage => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedImage = Object.assign({}, prevImage, updatedField)
      return editedImage
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/images/${props.match.params.imageId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { image }
    })
      .then(() => setUpdated(true))
      // .catch(console.error)
      .then(() => msgAlert({
        heading: 'Edited Image',
        message: messages.editImageSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setImage({
          tag: '',
          caption: '',
          imageUrl: '',
          like: 0,
          forSale: false })
        msgAlert({
          heading: 'Failed to update ' + error.message,
          message: messages.editImageFailure,
          variant: 'danger'
        })
      })
  }

  if (updated) {
    return <Redirect to={`/images/${props.match.params.imageId}`} />
  }

  return (
    <div>
      <ImageForm
        image={image}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/images/${props.match.params.imageId}`}
      />
    </div>
  )
}
export default ImageEdit
