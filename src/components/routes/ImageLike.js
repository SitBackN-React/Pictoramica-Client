import React, { useState } from 'react'

const ImageLike = props => {
  const [imageLike, setImageLike] = useState({
    liked: false
  })

  // const [deleted, setDeleted] = useState(false)

  const { image } = props

  const handleLike = image => {
    // if imageLike.liked is true,
    // go to deleteLike to make imageLike.liked false
    // otherwise, go to createLike to make imageLike.liked true
    imageLike.liked ? deleteLike(image) : createLike(image)
  }

  const createLike = image => {
    console.log('CREATE LIKE')
    // setting state with opposite value
    setImageLike((e) => { return { liked: !imageLike.liked } })
  }

  const deleteLike = image => {
    console.log('DELETE LIKE')
    // setting state with opposite value
    setImageLike((e) => { return { liked: !imageLike.liked } })
  }

  console.log(imageLike)

  const likeIcon = imageLike.liked ? './../../images/like-icon.png' : './../../images/unlike-icon.png'
  return (
    <img
      key={image._id}
      className='like-icon'
      src={likeIcon}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        handleLike(image)
      }}
    />
  )
}

export default ImageLike
