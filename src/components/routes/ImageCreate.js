// import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
// import axios from 'axios'
//
// import apiUrl from '../../apiConfig'
// import ImageForm from './../shared/ImageForm'
// import messages from './../AutoDismissAlert/messages'
//
// const ImageCreate = (props) => {
//   // state of the image starts as empty string, 0, or false
//   const [image, setImage] = useState({ tag: '', caption: '', imageUrl: '', like: 0, forSale: false })
//   // state starts as null, will be updated once image created
//   const [createdImageId, setCreatedImageId] = useState(null)
//   // uses handle change and passes in the event param to handle action item
//   const handleChange = event => {
//     const updatedField = { [event.target.name]: event.target.value }
//     // sets the newly created image to an object
//     const editedImage = Object.assign({}, image, updatedField)
//     setImage(editedImage)
//   }
//   // submits the change
//   const handleSubmit = event => {
//     event.preventDefault()
//
//     const { msgAlert } = props
//
//     axios({
//       url: `${apiUrl}/images`,
//       method: 'POST',
//       headers: {
//         'Authorization': `Token token=${props.user.token}`
//       },
//       data: { image }
//     })
//     // sets the updated data information to the image id specified
//       .then(res => setCreatedImageId(res.data.image._id))
//       // success message if image created
//       .then(() => msgAlert({
//         heading: 'Image created successfully',
//         message: messages.createImageSuccess,
//         variant: 'success'
//       }))
//       .catch(error => {
//         setImage({ tag: '', caption: '', imageUrl: '', like: 0, forSale: false })
//         msgAlert({
//           heading: 'Image create failed: ' + error.message,
//           message: messages.createImageFailure,
//           variant: 'danger'
//         })
//       })
//   }
//   // if image is created, take the user to the newly created image
//   if (createdImageId) {
//     return <Redirect to={`/images/${createdImageId}`} />
//   }
//   // the form for the user to fill out to create a image. Uses handleSubmit and handleChange
//   // cancel path takes user back to all image page.
//   return (
//     <div>
//       <ImageForm
//         image={image}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//         cancelPath='/images'
//       />
//     </div>
//   )
// }
//
// export default ImageCreate

import React, { useState } from 'react'
import { uploadS3 } from './../../api/s3upload.js'
import messages from '../AutoDismissAlert/messages'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function UploadS3Image (props) {
  const [caption, setCaption] = useState('')
  const [tag, setTag] = useState('')
  const [image, setImageCreate] = useState('')
  const [url, setUrl] = useState('')

  const hiddenFileInput = React.useRef(null)

  function uploadWithFormData () {
    const formData = new FormData()
    formData.append('caption', caption)
    formData.append('tag', tag)
    formData.append('image', image)

    let link = ''
    const { msgAlert, history, setImage, user } = props
    uploadS3('multipart/form-data', formData, user)
      .then(res => {
        link = res.data.image._id
        setImage(res.data.image)
      })
      .then(() => msgAlert({
        heading: 'Image created successfully',
        message: messages.createImageSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/images/${link}`))
      .catch(error => {
        setCaption('')
        setTag('')
        setImageCreate(null)
        msgAlert({
          heading: 'Image create failed: ' + error.message,
          message: messages.createImageFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <form onSubmit={uploadWithFormData}>
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
      <div>
        <label>Image Url</label>
        <input
          type='file'
          ref={hiddenFileInput}
          placeholder="Example: /images/sunset.jpg"
          size="25"
          onChange={e => {
            setImageCreate(e.target.files[0])
            setUrl(URL.createObjectURL(e.target.files[0]))
          }}
        />
      </div>
      <br />
      <button type="submit" className="btn btn-primary">Upload</button>
      <Link to='/my-images'>
        <button className="btn btn-danger">Cancel</button>
      </Link>
      <Image className='thumbnail' src={url} />
    </form>

  )
}

export default UploadS3Image
