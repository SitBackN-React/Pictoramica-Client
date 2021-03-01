import React from 'react'
// import { Link } from 'react-router-dom'
// import apiUrl from './../../apiConfig'
import AllImages from './AllImages'
import AllBlogs from './AllBlogs'

const HomePage = (props) => {
  const styles = {
    welcomeContainer: { position: 'absolute', width: '100%' },
    textStyle: { fontSize: '27px', color: 'black' },
    floatContainer: { position: 'absolute', width: '85%' },
    floatChild: { width: '40%', float: 'left', padding: '10px', border: '2px solid gray', display: 'block', marginRight: '20px' }
  }
  const { user } = props
  return (
    <React.Fragment>
      <div className="welcomeContainer welcome-user py-5">
        { user && <span className="m-auto" style={ styles.textStyle }>Welcome Back, {user.email}!</span>}
      </div>
      <h1>Pictoramica</h1>
      <div style={ styles.floatContainer }>
        <div style={ styles.floatChild }>
          <AllImages
            {...props}
          />
        </div>
        <div style={ styles.floatChild }>
          <AllBlogs
            {...props}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage
