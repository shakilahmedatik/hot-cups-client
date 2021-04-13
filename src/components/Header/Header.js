import React, { useContext } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { UserContext } from '../../App'
import firebase from 'firebase/app'
import logo from '../../images/logo.png'

const Header = ({ history }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const signOut = async e => {
    e.preventDefault()

    await firebase
      .auth()
      .signOut()
      .then(function () {
        setLoggedInUser({})
        console.log('Successfully signed out.')
      })
      .catch(function (error) {
        console.log(error)
        console.log('An error occurred')
      })

    history.push('/')
  }
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: '#ff9900' }
    } else {
      return { color: '#ffffff' }
    }
  }
  return (
    <Navbar sticky='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <div className='container'>
        <Navbar.Brand>
          <Link className='nav-item text-light' to='/'>
            <img
              alt=''
              src={logo}
              height='30'
              className='d-inline-block align-top'
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            <li className='nav-item'>
              <Link className='nav-link' style={isActive(history, '/')} to='/'>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive(history, '/order')}
                to='/order'
              >
                Orders
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive(history, '/admin')}
                to='/admin'
              >
                Admin
              </Link>
            </li>
            <NavDropdown
              bg='dark'
              variant='dark'
              title={<i className='fas fa-user'></i>}
              id='collasible-nav-dropdown'
            >
              <div className='bg-dark'>
                {!loggedInUser.isSignedIn && (
                  <>
                    <li className='nav-item'>
                      <Link
                        className='nav-link'
                        style={isActive(history, '/login')}
                        to='/login'
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}

                {loggedInUser.isSignedIn && (
                  <li className='nav-item'>
                    <span
                      className='nav-link'
                      style={{ cursor: 'pointer', color: '#ffffff' }}
                      onClick={signOut}
                    >
                      <i className='fas fa-sign-out-alt'></i> Logout
                    </span>
                  </li>
                )}
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default withRouter(Header)
