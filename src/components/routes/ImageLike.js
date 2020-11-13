import React, { useState } from 'react'
import axios from 'axios'

import apiUrl from './../../apiConfig'

const ImageLike = (props) => {
  const [imageLike, setImageLike] = useState({
    imageUrl: props.image.imageUrl,
    like: props.image.like
  })

  const handleChange = (event) => setImageLike(() => {
    return {
      imageUrl: props.image.imageUrl,
      like: !imageLike.like
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/images/${props.image._id}/image-like`,
      method: 'PATCH',
      data: { image: {
        imageUrl: props.image.imageUrl,
        like: !imageLike.like
      } }
    })
      .catch(console.error)
  }

  const likeIcon = (imageLike.like) ? './../../images/like-icon.png' : './../../images/unlike-icon.png'

  return (
    <img
      key={props.image._id}
      className='like-icon'
      src={likeIcon}
      style={{ cursor: 'pointer' }}
      onClick={(event) => {
        handleChange(event)
        handleSubmit(event)
      }}
    />
  )
}
export default ImageLike
