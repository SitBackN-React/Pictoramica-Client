import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Figure from 'react-bootstrap/Figure'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'
import ImageLike from './ImageLike'

const MyImages = (props) => {
  // starts the image state as an empty array
  // array will hold the images
  const [myImages, setMyImages] = useState([])

  const { msgAlert } = props
  // GET request to get all of the images user has created
  useEffect(() => {
    axios({
      url: `${apiUrl}/my-images`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      // sets the response
      .then(res => setMyImages(res.data.images))
      // success message if user is viewing all lists
      .then(() => msgAlert({
        heading: 'Showing all of your images',
        message: messages.showImagesSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setMyImages({ tag: '', caption: '', imageUrl: '', like: 0, forSale: false })
        msgAlert({
          heading: 'Failed to show your images ' + error.message,
          message: messages.showImagesFailure,
          variant: 'danger'
        })
      })
  }, [])

  // returns the image caption, caption is a link so user can click that directly to get more information other than caption on image (refer to Image.js)
  const imagesJsx = myImages.map(image => (
    <div key={image._id} style={{ margin: '10px' }}>
      <Link to={`/images/${image._id}`}>
        <Figure>
          <Figure.Image
            width={180}
            height={180}
            alt={image.caption}
            src={image.imageUrl}
          />
          <Figure.Caption style={{ color: 'white', backgroundColor: 'gray' }}>
            <p>{image.caption}</p>
            <p>{image.tag}</p>
            <div className="like-button">
              <ImageLike
                image={image}
                {...props}
                user={props.user}
              />
            </div>
          </Figure.Caption>
        </Figure>
      </Link>
    </div>
  ))
  // the imagesjsx is returned and displayed under a heading.
  // button to Log a New image will take user to create image page.
  return (
    <div style={{ textAlign: 'center', color: 'white' }}>
      <h4>My Images</h4>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {imagesJsx}
        </div>
      </div>
      <Link to={'/post-image'}>
        <button className="button btn btn-dark btn-lg">Add New Image</button>
      </Link>
    </div>
  )
}

export default MyImages
