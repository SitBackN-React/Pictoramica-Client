import React, { useState } from 'react'
// import React from 'react'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const ImageLike = (props) => {
  const [imageLike, setImageLike] = useState({
    liked: true
  })

  const { image, msgAlert } = props
  // const { image } = props

  const handleLike = image => {
    const newLike = Object.assign({}, imageLike)
    setImageLike(newLike)
    createLike(image)
    console.log('handleLike ', imageLike)
  }

  const createLike = image => {
    console.log(image)
    console.log('createLike ', imageLike)
    event.preventDefault()
    axios({
      url: `${apiUrl}/images/${image._id}/imageLikes`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { imageLike }
    })
      .then(res => { setImageLike(res.data.imageLike) })
      .then(() => msgAlert({
        heading: 'Showing all images',
        message: messages.likeImageSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setImageLike([])
        // message if images failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.likeImageFailure,
          variant: 'danger'
        })
      })
  }

  console.log(imageLike)

  // const deleteLike = image => {
  //   console.log('deleteLike!')
  //   const likedImageId = image._id.toString()
  //
  //   axios({
  //     url: `${apiUrl}/image-liked/${likedImageId}`,
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Token token=${props.user.token}`
  //     }
  //   })
  //     .then(() => {
  //       setUserLikedImage([])
  //     })
  //     .then(() => msgAlert({
  //       heading: 'Showing all images',
  //       message: messages.unlikeImageSuccess,
  //       variant: 'primary'
  //     }))
  //     .catch(error => {
  //       setUserLikedImage([])
  //       // message if images failed to show
  //       msgAlert({
  //         heading: 'Failed to delete' + error.message,
  //         message: messages.unlikeImageFailure,
  //         variant: 'danger'
  //       })
  //     })
  // }

  return (
    <img
      key={image._id}
      className='like-icon'
      src={'./../../images/unlike-icon.png'}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        handleLike(image)
        // handleSubmit(event)
      }}
    />
  )
}

export default ImageLike
