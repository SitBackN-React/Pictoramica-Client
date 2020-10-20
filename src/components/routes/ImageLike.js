import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const ImageLike = (props) => {
  const [imageLiked, setImageLiked] = useState({
    tag: props.image.tag,
    caption: props.image.caption,
    imageUrl: props.image.imageUrl,
    like: props.image.like,
    forSale: props.image.forSale
  })

  console.log(props)

  const handleChange = (event) => setImageLiked((e) => {
    const imageLikedCount = imageLiked + 1
    console.log(setImageLiked)
    return {
      tag: props.image.tag,
      caption: props.image.caption,
      imageUrl: props.image.imageUrl,
      like: imageLikedCount,
      forSale: props.image.forSale
    }
  })
  console.log(props)

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/image/${props.image._id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { image: {
        tag: props.image.tag,
        caption: props.image.caption,
        imageUrl: props.image.imageUrl,
        like: imageLiked.like,
        forSale: props.image.forSale } }
    })
      .catch(console.error)
  }

  return (
    <div key={props.image._id}>
      <div className="image-box">
        <Link to={`/lists/${props.image._id}`}>{props.image.imageUrl}</Link>
      </div>
      <div>
        <p>Caption: {props.image.caption}</p>
      </div>
      <div>
        <p>Tag: {props.image.tag}</p>
      </div>
      <div>
        <p>Like:
          <input className="image-like-box" type="button" value={ imageLiked.like ? '✔' : '' } onClick={(event) => {
            handleChange(event)
            handleSubmit(event)
          } } />
        </p>
      </div>
    </div>
  )
}
export default ImageLike
