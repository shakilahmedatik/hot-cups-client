import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import Header from '../Header/Header'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState({
    loading: false,
  })

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/products`)
      .then(res => res.json())
      .then(data => {
        setLoading(true)
        setProducts(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  const showLoading = loading =>
    loading && (
      <div className='container'>
        <div className='row justify-content-center'>
          <div class='spinner-border' role='status'>
            <span class='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    )

  return (
    <div>
      <Header />
      <div className='container p-5'>
        <div className='row'>
          <div className='col-8 offset-2'>
            <div class='input-group mb-3'>
              <input
                type='text'
                className='form-control p-3'
                placeholder='Search Coffee or Tea'
                aria-label='Search Coffee or Tea'
                aria-describedby='basic-addon2'
              />
              <div className='input-group-append'>
                <button className='btn btn-secondary' type='button'>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          {showLoading(loading)}
          {products.map((product, i) => (
            <div key={i} className='col-12 col-md-6 col-xl-4 mb-4'>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
