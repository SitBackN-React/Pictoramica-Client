import React, { useState, useEffect } from 'react'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'

const ImageLike = props => {
  const { image, msgAlert } = props

  const [imageLikeArr, setImageLikeArr] = useState(null)

  useEffect(() => {
    axios({
      url: `${apiUrl}/imageLikes`,
      method: 'GET'
    })
      .then(res => setImageLikeArr(res.data.imageLikes))
      .then(() => msgAlert({
        heading: 'Showing all imageLikes',
        message: messages.showAllImageLikesSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setImageLikeArr([])
        // message if images failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.showAllImageLikesFailure,
          variant: 'danger'
        })
      })
  }, [])
  console.log('imageLikeArr: ', imageLikeArr) // null until completed GET request

  // if (imageLikeArr !== null) {
  //   console.log('imageLikeArr[0]: ', imageLikeArr[0])
  //   console.log('imageLikeArr[0].imageId: ', imageLikeArr[0].imageId)
  //   console.log('image._id: ', image._id)
  //   const specOwner = imageLikeArr.filter(imageLike => imageLike.imageId === image._id).filter(owner => owner.owner === user._id)
  //   // const specOwner = specImage.filter(owner => owner.owner === user._id)
  //   console.log('Specific Owner Array: ', specOwner) // this shows only if ids match; otherwise it would be an empty array
  //   if (specOwner !== undefined) { // tried to input a conditional, but it still considers undefined data
  //     console.log('First Specific Owner: ', specOwner[0]) // if there is no specific owner array then this becomes undefined
  //   }
  //   // console.log(specOwner[0].liked)
  // }

  const [userLiked] = useState(false)

  const handleLike = () => {
    console.log('handleLike')
    // change heart color
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
      <div></div>
    </div>
  )
}

export default ImageLike
