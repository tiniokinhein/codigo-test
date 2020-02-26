import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { auth } from './auth/Config'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import LogIn from './components/LogIn'
import ItemDetail from './components/ItemDetail'
import Default from './pages/Default'


function PrivateRoute({ component: Component , authenticated , ...rest }) {
  return(
    <Route
      {...rest}
      render={
        (props) => authenticated === true 
          ? <Component {...props} />
          : <Redirect 
              to={{ 
                pathname: "/login" , 
                state: { 
                  from : props.location 
                } 
              }} 
            />
      }
    />
  )
}

function PublicRoute({ component: Component , authenticated , ...rest }) {
  return(
    <Route
      {...rest}
      render={
        (props) => authenticated === false
          ? <Component {...props} />
          : <Redirect to="/" />
      }
    />
  )
}

class App extends Component {

  state = {
    authenticated: false
  }

  componentDidMount() {

    auth.onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          authenticated: true
        })
      } else {
        this.setState({
          authenticated: false
        })
      }
    })

  }

  render() {

    return(
      <React.Fragment>

        <Router>
          <Switch>
            <PrivateRoute exact path="/" authenticated={this.state.authenticated} component={Home} />
            <PrivateRoute path="/item/:pack_alias" authenticated={this.state.authenticated} component={ItemDetail} />
            <PrivateRoute path="/about-us" authenticated={this.state.authenticated} component={AboutUs} />
            <PublicRoute path="/login" authenticated={this.state.authenticated} component={LogIn} />
            <PublicRoute authenticated={this.state.authenticated} component={Default} />
          </Switch>
        </Router>

      </React.Fragment>
    )
  }
}

export default App