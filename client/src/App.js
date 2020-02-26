import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/Profile';
import AuthService from './components/auth/auth-service';
import ProtectedRoute from './components/auth/protected-route';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: null
    }

    this.service = new AuthService();
  }

  fetchUser = () => {
    if(this.state.loggedInUser === null) {
      this.service.loggedIn()
        .then(r => {
          this.setState({
            loggedInUser: r
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  componentDidMount = () => {
    this.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <h1>IronProfile</h1>
        <Link to="/signup">Signup</Link> - <Link to="/login">Login</Link> - <Link to="/profile">Profile</Link>

        <Switch>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/login" render={(props) => <Login {...props} getUser={this.getTheUser} />}></Route>
          <ProtectedRoute user={this.state.loggedInUser} path="/profile" getUser={this.getTheUser} component={Profile}></ProtectedRoute>
        </Switch>
      </div>
    );
  }
}

export default App;
