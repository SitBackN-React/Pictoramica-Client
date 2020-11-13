import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from './../AutoDismissAlert/messages'
import ImageLike from './ImageLike'

const Image = (props) => {
  // single image starts with a state of null, to be changed once setImage used
  const [image, setImage] = useState(null)
  // deleted starts with a state of false, to be changed once setDeleted used
  const [deleted, setDeleted] = useState(false)
  // for messages to show, need to set them to props
  const { msgAlert } = props
  // GET to show the image with the id that matches the params in url
  useEffect(() => {
    axios({
      url: `${apiUrl}/images/${props.match.params.imageId}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
    // updates the state with the data from image that was specified by id above
      .then(res => setImage(res.data.image))
      // .catch(console.error)
      // success message when a image is shown
      .then(() => msgAlert({
        heading: 'Showing selected image',
        message: messages.showImageSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setImage({
          tag: '',
          caption: '',
          imageUrl: '',
          like: 0,
          forSale: false })
        msgAlert({
          heading: 'Failed to show image ' + error.message,
          message: messages.showImageFailure,
          variant: 'danger'
        })
      })
  }, [])
  // delete action to delete the image that is specified by its id.
  const destroy = () => {
    axios({
      url: `${apiUrl}/images/${props.match.params.imageId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Image Deleted',
        message: messages.deleteImageSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setImage({
          tag: '',
          caption: '',
          imageUrl: '',
          like: 0,
          forSale: false
        })
        // message if images failed to show
        msgAlert({
          heading: 'Failed to delete' + error.message,
          message: messages.deleteImageFailure,
          variant: 'danger'
        })
      })
  }
  // if there's no image to show where user clicked, show "loading..."
  if (!image) {
    return <p>Loading...</p>
  }
  // if a image is deleted, Redirect user back to the list of all images
  if (deleted) {
    return (
      <Redirect to={'/my-images'} />
    )
  }

  return (
    // shows the specified fields(all details of the image) when a image is clicked
    <div>
      <h4>{image.caption}</h4>
      <p>{image.tag}</p>
      <p>{image.url}</p>
      <div className="like-button">
        <ImageLike
          image={image}
        />
      </div>
      {/*  button to click to delete a image */}
      {props.user._id === image.owner ? (
        <button className="btn btn-danger" onClick={destroy}>Delete Image</button>
      ) : (
        <button style={{ display: 'none' }}></button>
      )}
      {/*  // Link to take user to the edit page once the Edit Image button is clicked */}
      {props.user._id === image.owner ? (
        <Link to={`/images/${props.match.params.imageId}/edit-image`}>
          <button className="button btn btn-warning">Edit Image</button>
        </Link>
      ) : (
        <button style={{ display: 'none' }}></button>
      )}
      <div>
        {/* Link to take user back to all images list */}
        <Link to='/my-images'>Go to my images</Link>
      </div>
      <div>
        <Link to='/all-images'>Go to all images</Link>
      </div>
    </div>
  )
}
export default Image
