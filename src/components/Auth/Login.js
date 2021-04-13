import React, { useContext, useState } from 'react'
import Header from '../Header/Header'
import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../firebase.config'
import './Login.css'
import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router'

const Login = () => {
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    uid: '',
  })

  //Handle Google Sign-In
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  const googleSignInHandle = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(result => {
        const { displayName, email, uid } = result.user
        setUser({
          isSignedIn: true,
          name: displayName,
          email: email,
          uid: uid,
        })
        setLoggedInUser({
          isSignedIn: true,
          name: displayName,
          email: email,
          uid: uid,
        })
        history.replace(from)
      })
      .catch(error => {
        // Handle Errors here.
        const newUserInfo = { ...user }
        newUserInfo.success = false
        newUserInfo.error = error.message
      })
  }

  return (
    <div>
      <Header />
      <div className='signup-form'>
        <div className='text-center'>
          <button
            style={{ width: '250px' }}
            onClick={googleSignInHandle}
            className='btn btn-danger mb-2'
          >
            Sign in with <i className='fab fa-google'></i>
          </button>
          <br />
        </div>
      </div>
    </div>
  )
}

export default Login
