import React, { useEffect, useState, useContext } from 'react'
import { Redirect, useParams } from 'react-router'
import Header from '../Header/Header'
import { UserContext } from '../../App'

const Checkout = () => {
  const [loading, setLoading] = useState({
    loading: false,
  })
  // const [redirect, setRedirect] = useState(false)
  const [redirectOrder, setRedirectOrder] = useState(false)
  const [product, setProduct] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const id = useParams()._id

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/product/${id}`)
      .then(res => res.json())
      .then(data => {
        setLoading(true)
        setProduct(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  console.log(loggedInUser)
  const processOrder = e => {
    e.preventDefault()
    // if (!loggedInUser.isSignedIn) {
    //   return setRedirect(true)
    // }
    const newOrder = {
      product: product.name,
      price: product.price,
      quantity: 1,
      userName: loggedInUser.name,
      email: loggedInUser.email,
      uid: loggedInUser.uid,
    }
    fetch(`${process.env.REACT_APP_API}/addOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrder),
    })
      .then(response => {
        setRedirectOrder(true)
      })
      .catch(err => {
        console.log(err)
      })
  }
  // const redirectUser = () => {
  //   if (redirect) {
  //     return <Redirect to='/login' />
  //   }
  // }
  const redirectUserToOrder = () => {
    if (redirectOrder) {
      return <Redirect to='/order' />
    }
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
    <div>
      <Header />
      <div className='container mt-5'>
        <div className='row'>
          {showLoading(loading)}
          <div className='col col-12 col-md-6 col-xl-6 offset-md-3 offset-xl-3'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>1</th>
                  <td>{product.name}</td>
                  <td>1</td>
                  <td>{product.price}$</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <td></td>
                  <td></td>
                  <td>{product.price}$</td>
                </tr>
              </tfoot>
            </table>
            <button onClick={processOrder} className='btn btn-success '>
              Checkout
            </button>

            {redirectUserToOrder()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
