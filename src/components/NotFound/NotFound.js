import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'

const NotFound = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <div className='text-center text-danger'>
        <h1>404!</h1>
        <h2>'PAGE NOT FOUND'</h2>
        <button className='btn btn-info'>
          <Link to='/'>Home</Link>
        </button>
      </div>
    </div>
  )
}

export default NotFound
