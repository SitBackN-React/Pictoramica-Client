import React from 'react'
// import { Link } from 'react-router-dom'
// import apiUrl from './../../apiConfig'
import AllImages from './AllImages'
import AllBlogs from './AllBlogs'

const HomePage = (props) => {
  return (
    <React.Fragment>
      <h1>Pictoramica</h1>
      <div className="float-container">
        <div className="float-child">
          <AllImages
            {...props}
          />
        </div>
        <div className="float-child">
          <AllBlogs
            {...props}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage
