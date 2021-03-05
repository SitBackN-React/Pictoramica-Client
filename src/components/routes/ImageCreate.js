import React, { useState } from 'react'
import { uploadS3 } from './../../api/s3upload.js'
import messages from '../AutoDismissAlert/messages'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingButton from './../shared/LoadingButton'
import ForSale from './ForSale'

function UploadS3Image (props) {
  const [caption, setCaption] = useState('')
  const [tag, setTag] = useState('')
  const [image, setImageCreate] = useState('')
  const [url, setUrl] = useState('')
  const [price, setPrice] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const hiddenFileInput = React.useRef(null)

  let link = ''
  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [isLoading])

  function uploadWithFormData () {
    const formData = new FormData()
    formData.append('caption', caption)
    formData.append('tag', tag)
    formData.append('image', image)
    formData.append('price', price)

    const { msgAlert, history, setImage, user } = props
    uploadS3('multipart/form-data', formData, user)
      .then(res => {
        setImage(res.data.image)
        link = res.data.image._id
      })
      .then(() => msgAlert({
        heading: 'Image created successfully',
        message: messages.createImageSuccess,
        variant: 'success'
      }))
      .then(() => history.push((`/images/${link}`)))
      .catch(error => {
        setCaption('')
        setTag('')
        setPrice('')
        setImageCreate(null)
        setIsLoading(false)
        msgAlert({
          heading: 'Image create failed: ' + error.message,
          message: messages.createImageFailure,
          variant: 'danger'
        })
      })
  }

  return (

    <div className='image-create-body'>
      <form onSubmit={uploadWithFormData}>
        <div className="center">
          <div className="left">
            <button
              onClick={() => hiddenFileInput.current.click()}
              className="btn btn-info add-image" type='button'>
              Add Image
            </button>
            <input
              style={{ display: 'none' }}
              type='file'
              ref={hiddenFileInput}
              onChange={e => {
                setImageCreate(e.target.files[0])
                setUrl(URL.createObjectURL(e.target.files[0]))
              }}
            />
          </div>
          <br />
          <div className="right">
            <div>
              <label>Image Caption</label>
              <input
                type='text'
                value={caption}
                onChange={e => { setCaption(e.target.value) }}
                placeholder='Example: My sunset painting'
                size="25"
              />
            </div>
            <br />
            <div>
              <label>Image Tag</label>
              <input
                type='text'
                value={tag}
                onChange={e => setTag(e.target.value)}
                placeholder='Example: #sunset #painting'
                size="25"
              />
            </div>
            <br />
            <div>For Sale:
              <ForSale
                image={image}
                {...props}
                user={props.user}
              />
            </div>
            <br />
            <div>
              <label>Price</label>
              <input
                type='number'
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder='Example: $20'
                size="25"
              />
            </div>
            <LoadingButton
              type="submit"
              className="btn btn-primary share"
              isLoading={isLoading}
              onClick={() => setIsLoading(true)}
            >
              Upload
            </LoadingButton>
            <Link to='/my-images'>
              <button className="btn btn-danger">Cancel</button>
            </Link>
          </div>
        </div>
        <br />
        <Image className='img-preview' src={url} />
      </form>
    </div>
  )
}

export default UploadS3Image
