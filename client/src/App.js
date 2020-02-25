import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>IronProfile</h1>
        <Link to="/signup">Signup</Link> - <Link to="/login">Login</Link>

        <Switch>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/login" component={Login}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
