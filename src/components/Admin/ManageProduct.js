import React, { useState, useEffect } from 'react'

const ManageProduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState({
    loading: false,
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    fetch(`${process.env.REACT_APP_API}/products`)
      .then(res => res.json())
      .then(data => {
        setLoading(true)
        setProducts(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  const destroy = productId => {
    fetch(`${process.env.REACT_APP_API}/product/${productId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        loadProducts()
      })
      .catch(err => console.log(err))
  }

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
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'>Total {products.length} products</h2>
          <hr />
          {showLoading(loading)}
          <ul className='list-group'>
            {products.map((p, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{p.name}</strong>
                <span onClick={() => destroy(p._id)}>
                  <button className='btn btn-danger'>Delete</button>
                </span>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </div>
  )
}

export default ManageProduct
