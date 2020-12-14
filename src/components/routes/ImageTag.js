import React from 'react'

const ImageTag = props => {
  console.log(props)
  // console.log(props.location.aboutProps.tag.tag)
  return (
    <div>
      <h1>HELLO You have reached the Image Tag Page</h1>
      <p>The tag that you have clicked on is <strong><u>{props.location.aboutProps.tag.tag}</u></strong></p>
      <p>Images with the same tag name will appear here</p>
    </div>
  )
}

export default ImageTag
