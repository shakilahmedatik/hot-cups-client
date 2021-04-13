import React, { useContext, useState } from 'react'
import { UserContext } from '../../App'
import AddProduct from './AddProduct'
import ManageProduct from './ManageProduct'
import Header from '../Header/Header'

const Admin = () => {
  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [view, setView] = useState({
    manage: true,
    add: false,
  })

  const showManage = () => {
    setView({
      manage: true,
      add: false,
    })
  }

  const showAdd = () => {
    setView({
      manage: false,
      add: true,
    })
  }

  return (
    <>
      <Header />
      <div className='row'>
        <div
          style={{ height: '100vh' }}
          className='col col-12 col-md-3 col-xl-3 bg-dark'
        >
          <div className='container pt-5'>
            <button onClick={showManage} className='btn btn-primary'>
              Manage Product
            </button>
            <br />
            <br />
            <button onClick={showAdd} className='btn btn-primary'>
              Add Product
            </button>
          </div>
        </div>
        <div className='col col-12 col-md-9 col-xl-9'>
          <div className='container pt-5'>
            {view.manage && <ManageProduct />}
            {view.add && <AddProduct />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
