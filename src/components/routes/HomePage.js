import React from 'react'
// import { Link } from 'react-router-dom'
// import apiUrl from './../../apiConfig'
import AllImages from './AllImages'
import AllBlogs from './AllBlogs'

const HomePage = (props) => {
  return (
    <React.Fragment>
      <div>
        <AllImages />
      </div>
      <div>
        <AllBlogs />
      </div>
    </React.Fragment>
  )
}

export default HomePage
