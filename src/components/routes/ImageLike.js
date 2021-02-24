import React, { useState } from 'react'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const ImageLike = props => {
  const { image, userLiked, imageLikedId, user, msgAlert } = props

  const [userLike, setUserLike] = useState({
    liked: userLiked
  })
  console.log(imageLikedId)

  const [likeId, setLikeId] = useState({
    imageLikedId: imageLikedId
  })

  console.log(likeId.imageLikedId)
  const handleLike = () => {
    console.log(image)
    // if false, go to createLike to set imageLike.liked to true
    // if imageLike.liked is true,
    // go to deleteLike to make imageLike.liked false
    userLike.liked ? deleteLike(image) : createLike(image)
  }

  const createLike = image => {
    console.log('CREATE LIKE')
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
        console.log(res)
        const imageLikesArr = res.data.image.imageLikes
        const createdLike = imageLikesArr[imageLikesArr.length - 1]
        const createdLikeId = createdLike._id
        setLikeId({
          imageLikedId: createdLikeId
        })
      })
      .then((e) => setUserLike({
        liked: !userLike.liked
      }))
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
    console.log('DELETE LIKE')

    // get the id of the imageLike owner
    axios({
      url: `${apiUrl}/images/${image._id}/imageLikes/${likeId.imageLikedId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then((e) => setUserLike({
        liked: !userLike.liked
      }))
      .then((e) => setLikeId({
        imageLikedId: '0'
      }))
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
  console.log('likeId.imageLikedId in ImageLike Component: ', likeId.imageLikedId)
  console.log(user._id)

  const likeIcon = userLike.liked ? './../../images/like-icon.png' : './../../images/unlike-icon.png'
  return (
    <div>
      <img
        key={image._id}
        className='like-icon'
        src={likeIcon}
        style={{ cursor: 'pointer' }}
        onClick={handleLike}
      />
      <p>{image.imageLikes.length}</p>
    </div>
  )
}

export default ImageLike
