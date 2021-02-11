import React, { useState } from 'react'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const ImageLike = props => {
  // Each image has a set of imageLike array with multiple imageLikes
  const { image, msgAlert, user } = props
  // console.log('user ', user)
  // console.log('image ', image)
  // console.log('imageLike ', image.imageLikes)
  // map out all owners from imageLikes array
  const imageLikeOwners = image.imageLikes.map(el => el.owner)
  // console.log(imageLikeOwners)
  // need to find if there is an imageLike that matches the id of the user
  const isImageLikeOwner = imageLikeOwners.includes(user._id)
  // console.log('T or F: does the user have a like on this image? ', isImageLikeOwner)
  // find the index of the owner that matches the user's id
  const imageLikeOwnerIndex = imageLikeOwners.indexOf(user._id)
  // console.log(imageLikeOwnerIndex)

  const [userLiked, setUserLiked] = useState(isImageLikeOwner)

  // console.log('Line 27 userLiked status ', userLiked)

  const handleLike = image => {
    // console.log(userLiked)
    // if false, go to createLike to set imageLike.liked to true
    // if imageLike.liked is true,
    // go to deleteLike to make imageLike.liked false
    userLiked ? deleteLike(image) : createLike(image)
  }

  const createLike = image => {
    // console.log('CREATE LIKE')
    // setting state with opposite value

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
    // console.log('DELETE LIKE')
    // setting state with opposite value

    // get the id of the imageLike owner
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
