import React, { Component } from 'react';
import AuthService from './auth-service';

class Login extends Component {
    constructor(props){
      super(props);
      this.state = { username: '', password: '' };
      this.service = new AuthService();
    }

    render() {
        return (
            <div>
                <h1>Login page</h1>
                <form onSubmit={this.handleFormChange}>
                    <input />
                    <input />
                    <button></button>
                </form>
            </div>
        )
    }
}

export default Login;