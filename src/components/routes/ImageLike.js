import React, { useState } from 'react'

const ImageLike = props => {
  const [imageLike, setImageLike] = useState({
    liked: false
  })

  // const [deleted, setDeleted] = useState(false)

  const { image } = props

  const handleLike = image => {
    setImageLike((e) => { return { liked: !imageLike.liked } })
  }
  console.log(imageLike)

  // const createLike = image => {
  //   console.log('CREATE LIKE')
  //   setImageLike((e) => { return { liked: true } })
  //   setDeleted(false)
  // }
  // console.log('imageLike after createLike ', imageLike)
  // console.log('deleted after createLike ', deleted)
  //
  // const deleteLike = image => {
  //   console.log('DELETE LIKE')
  //   setDeleted(true)
  // }
  // console.log('deleted after deleteLike ', deleted)

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
