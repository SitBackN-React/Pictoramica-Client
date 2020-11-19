import React, { useState } from 'react'

import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const ImageLike = props => {
  const [imageLike, setImageLike] = useState({
    liked: true
  })
  const [deleted, setDeleted] = useState(false)
  console.log(props)
  const { image, msgAlert } = props
  console.log('image in imageLike ', image)

  const handleLike = image => {
    console.log('handleLike with image argument! ', image)
    console.log('user id ', props.user._id)
    console.log('image owner id ', image.owner)
    console.log(image.imageLikes)
    const imageLikeOwners = image.imageLikes.map(el => el.owner)
    console.log('imageLikeOwners ', imageLikeOwners)
    const isImageLikeOwner = imageLikeOwners.includes(props.user._id)
    console.log('isImageLikeOwner ', isImageLikeOwner)

    // if true then direct to deleteLike
    if (isImageLikeOwner) {
      deleteLike(image)
    } else {
      // otherwise direct to createLike
      createLike(image)
    }
  }

  const createLike = image => {
    const newLike = Object.assign({}, imageLike)
    console.log('newLike ', newLike)
    setImageLike(newLike)
    console.log('createLike imageLike ', imageLike)
    console.log(image)

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
        heading: 'Image Liked',
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

  const deleteLike = image => {
    console.log('DeleteLike!')

    // map through imageLikes to find all owners
    const imageLikeOwners = image.imageLikes.map(el => el.owner)
    console.log('imageLikeOwners ', imageLikeOwners)

    // find the index of the owner that matches the user's id
    const imageLikeOwnerIndex = imageLikeOwners.indexOf(props.user._id)
    console.log('imageLikeOwnerIndex ', imageLikeOwnerIndex)

    // get the id of the imageLike owner
    const imageLikeOwnerId = image.imageLikes[imageLikeOwnerIndex]._id
    console.log('imageLikeOwnerId ', imageLikeOwnerId)

    axios({
      url: `${apiUrl}/images/${image._id}/imageLikes/${imageLikeOwnerId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Message Unliked',
        message: messages.unlikeImageSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setImageLike([])
        // message if images failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.unlikeImageFailure,
          variant: 'danger'
        })
      })
    console.log(imageLike)
  }

  if (deleted) {
    console.log('deleted!')
  }

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
