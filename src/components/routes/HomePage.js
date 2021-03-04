import React from 'react'
// import { Link } from 'react-router-dom'
// import apiUrl from './../../apiConfig'
import AllImagesHomePage from './AllImagesHomePage'
import AllBlogsHomePage from './AllBlogsHomePage'

const HomePage = (props) => {
  const { user } = props
  const styles = {
    welcomeContainer: { position: 'absolute', width: '100%' },
    floatContainer: { position: 'absolute', width: '85%' },
    floatChild: { width: '40%', float: 'left', padding: '10px', border: '2px solid gray', display: 'block', marginRight: '20px' }
  }

  const welcomeBar = user => (
    <div className="welcomeContainer welcome-user py-5">
      <div style={{ fontSize: '27px', color: 'black', marginLeft: '15px' }}>Welcome Back, {user.email}!</div>
    </div>
  )

  return (
    <React.Fragment>
      { user ? welcomeBar(user) : <div style={{ display: 'none' }}></div> }
      <br/>
      <div style={ styles.floatContainer }>
        <div style={ styles.floatChild }>
          <AllImagesHomePage
            {...props}
          />
        </div>
        <div style={ styles.floatChild }>
          <AllBlogsHomePage
            {...props}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage
