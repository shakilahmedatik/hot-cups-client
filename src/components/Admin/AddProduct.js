import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

const AddProduct = () => {
  const [redirect, setRedirect] = useState(false)
  const [values, setValues] = useState({
    name: '',
    price: '',
    image: '',
  })

  // eslint-disable-next-line no-unused-vars
  const { name, price, image } = values

  const handleChange = name => event => {
    const value = event.target.value
    setValues({ ...values, [name]: value })
  }

  const handleImageUpload = event => {
    console.log(event.target.files[0])
    const imageData = new FormData()
    imageData.set('key', process.env.REACT_APP_IMG_API_KEY)
    imageData.append('image', event.target.files[0])

    axios
      .post(process.env.REACT_APP_IMG_API, imageData)
      .then(function (response) {
        setValues({ ...values, image: response.data.data.display_url })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const clickSubmit = event => {
    event.preventDefault()
    const productData = {
      name: name,
      price: price,
      image: image,
    }

    fetch(`${process.env.REACT_APP_API}/addProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    setTimeout(() => {
      setRedirect(true)
    }, 1000)
  }

  const newPostForm = () => (
    // eslint-disable-next-line no-restricted-globals
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            // eslint-disable-next-line no-restricted-globals
            onChange={() => handleImageUpload(event)}
            type='file'
            name='image'
            accept='image/*'
          />
        </label>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          value={price}
        />
      </div>

      <button className='btn btn-outline-primary'>Create Product</button>
    </form>
  )
  const redirectUser = () => {
    if (redirect) {
      return <Redirect to='/' />
    }
  }

  return (
    <div className='row'>
      <div className='col'>
        <h1>Add Products</h1>

        {newPostForm()}
        {redirectUser()}
      </div>
    </div>
  )
}

export default AddProduct
