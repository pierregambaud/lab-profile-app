import React, { Component } from 'react';
import AuthService from './auth-service';

class Login extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            password: ''
        };
        
        this.service = new AuthService();
    }

    handleFormChange = (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        this.service.login(username, password)
            .then(r => {
                this.props.getUser(r)
            })
            .catch(err => console.error(err))
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <h1>Login page</h1>
                <form onSubmit={this.handleFormChange}>
                    <label>
                        Username
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <button>Log in</button>
                </form>
            </div>
        )
    }
}

export default Login;