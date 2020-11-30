import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import ImageForm from './../shared/ImageForm'
import messages from './../AutoDismissAlert/messages'

import Upload from './Upload'

const ImageCreate = (props) => {
  // state of the image starts as empty string, 0, or false
  const [image, setImage] = useState({ tag: '', caption: '', imageUrl: '', like: 0, forSale: false })
  // state starts as null, will be updated once image created
  const [createdImageId, setCreatedImageId] = useState(null)

  const [selectedFiles, setSelectedFiles] = useState(undefined)
  const [currentFile, setCurrentFile] = useState(undefined)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [setFileInfos] = useState([])

  // uses handle change and passes in the event param to handle action item
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    // sets the newly created image to an object
    const editedImage = Object.assign({}, image, updatedField)
    setImage(editedImage)
  }

  const selectFile = (event) => {
    setSelectedFiles(event.target.files)
  }

  const upload = () => {
    const currentFile = selectedFiles[0]

    setProgress(0)
    setCurrentFile(currentFile)

    Upload.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total))
    })
      .then((response) => {
        setMessage(response.data.message)
        return Upload.getFiles()
      })
      .then((files) => {
        setFileInfos(files.data)
      })
      .catch(() => {
        setProgress(0)
        setMessage('Could not upload the file!')
        setCurrentFile(undefined)
      })

    setSelectedFiles(undefined)
  }
  // submits the change
  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert } = props

    axios({
      url: `${apiUrl}/images`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { image }
    })
    // sets the updated data information to the image id specified
      .then(res => setCreatedImageId(res.data.image._id))
      // success message if image created
      .then(() => msgAlert({
        heading: 'Image created successfully',
        message: messages.createImageSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setImage({ tag: '', caption: '', imageUrl: '', like: 0, forSale: false })
        msgAlert({
          heading: 'Image create failed: ' + error.message,
          message: messages.createImageFailure,
          variant: 'danger'
        })
      })
  }
  // if image is created, take the user to the newly created image
  if (createdImageId) {
    return <Redirect to={`/images/${createdImageId}`} />
  }
  // the form for the user to fill out to create a image. Uses handleSubmit and handleChange
  // cancel path takes user back to all image page.
  return (
    <div>
      {currentFile && (
        <div className="progress">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + '%' }}
          >
            {progress}%
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Image Caption</label>
          <input
            type="text"
            placeholder="Example: My sunset painting"
            value={image.caption}
            name="caption"
            size="25"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image Tag</label>
          <input
            type="text"
            placeholder="Example: #sunset #painting"
            value={image.tag}
            name="tag"
            size="25"
            onChange={handleChange}
          />
        </div>
        <br />
        <label className="btn btn-default">Image Url</label>
        <input type="file" onChange={selectFile} />
        <br />
        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={upload}
        >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>
        <Link to='/my-images'>
          <button className="btn btn-danger">Cancel</button>
        </Link>
      </form>
    </div>
  )
}

export default ImageCreate
