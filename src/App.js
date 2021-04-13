import Home from './components/Home/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NotFound from './components/NotFound/NotFound'
import Login from './components/Auth/Login'
import { createContext, useState } from 'react'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Order from './components/Order/Order'
import Admin from './components/Admin/Admin'
import Checkout from './components/Checkout/Checkout'
export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <PrivateRoute path='/order'>
            <Order />
          </PrivateRoute>
          <PrivateRoute path='/admin'>
            <Admin />
          </PrivateRoute>
          <Route exact path='/'>
            <Home />
          </Route>
          <PrivateRoute path='/checkout/:_id'>
            <Checkout />
          </PrivateRoute>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default App
