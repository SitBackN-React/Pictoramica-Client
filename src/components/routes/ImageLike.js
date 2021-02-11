import React, { useState } from 'react'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const ImageLike = props => {
  const { image, msgAlert, user } = props

  const imageLikeOwners = image.imageLikes.map(el => el.owner)

  const isImageLikeOwner = imageLikeOwners.includes(user._id)

  const [userLiked, setUserLiked] = useState(isImageLikeOwner)

  const handleLike = image => {
    userLiked ? deleteLike(image) : createLike(image)
  }

  const createLike = image => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/images/${image._id}/imageLikes`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: { imageLike: {
        liked: true
      } }
    })
      .then(res => {
        // console.log(res)
        return res
      })
      .then((e) => setUserLiked(true))
      .then(() => msgAlert({
        heading: 'Image Liked',
        message: messages.likeImageSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        // message if images failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.likeImageFailure,
          variant: 'danger'
        })
      })
  }
  // console.log('after create ', userLiked)

  const deleteLike = image => {
    const imageLikeOwnerIndex = imageLikeOwners.indexOf(user._id)

    const imageLikeId = image.imageLikes[imageLikeOwnerIndex]._id
    axios({
      url: `${apiUrl}/images/${image._id}/imageLikes/${imageLikeId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then((e) => setUserLiked(false))
      .then(() => msgAlert({
        heading: 'Message Unliked',
        message: messages.unlikeImageSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        // message if images failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.unlikeImageFailure,
          variant: 'danger'
        })
      })
  }

  const likeIcon = userLiked ? './../../images/like-icon.png' : './../../images/unlike-icon.png'
  return (
    <div>
      <img
        key={image._id}
        className='like-icon'
        src={likeIcon}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          handleLike(image)
        }}
      />
      <p>{image.imageLikes.length}</p>
    </div>
  )
}

export default ImageLike
