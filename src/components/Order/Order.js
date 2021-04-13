import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import { UserContext } from '../../App'

const Order = () => {
  const [loading, setLoading] = useState({
    loading: false,
  })
  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [orders, setOrders] = useState([])
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/listOrder?id=${loggedInUser.uid}`)
      .then(res => res.json())
      .then(data => {
        setLoading(true)
        setOrders(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [loggedInUser.uid])

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
    <>
      <Header />
      <div className='container mt-5'>
        <div className='row'>
          {showLoading(loading)}
          <div className='col col-12 col-md-6 col-xl-6 offset-md-3 offset-xl-3'>
            <ul className='list-group list-group-flush'>
              {orders.map(order => {
                return (
                  <li key={order._id} className='list-group-item'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>Email</th>
                          <th scope='col'>Product</th>
                          <th scope='col'>Quantity</th>
                          <th scope='col'>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope='row'>1</th>
                          <td>{order.email}</td>
                          <td>{order.product}</td>
                          <td>{order.quantity}</td>
                          <td>{order.price}$</td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Order
