import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

// import messages from './../AutoDismissAlert/messages'

const ImageOther = (props) => {
  const [otherImages, setOtherImages] = useState([])

  // const { msgAlert } = props
  useEffect(() => {
    axios({
      url: `${apiUrl}/images-other`,
      method: 'GET'
    }, [])
      .then(res => {
        return setOtherImages(res.data.images)
      })
      .catch(console.error)
  }, [])

  const imagesJsx = otherImages.map(image => (
    <div className="list-group" key={image.imageUrl}>
      <ul>
        <li className="list-group-item">
          {/* // <div>{`/images/${image._id}`}</div> */}
          <div>
              Url: {image.imageUrl}
          </div>
          <div>
            Caption: {image.caption}
          </div>
          <div>
            Tag: {image.tag}
          </div>
        </li>
      </ul>
    </div>
  ))

  return (
    <div>
      <h4>Others Images</h4>
      <div>
        {imagesJsx}
      </div>
    </div>
  )
}

export default ImageOther
