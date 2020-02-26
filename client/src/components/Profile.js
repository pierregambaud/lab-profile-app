import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "./auth/auth-service";


class Profile extends Component {
    constructor(props) {
        super(props);

        this.service = new AuthService();
    }

    logoutUser = () => {
        this.service.logout()
            .then(() => {
                this.props.getUser(null);
            })
    }

    render() {
        if(this.props.loggedInUser) {
            const { username, campus, course } = this.props.loggedInUser;
            console.log(this.props.loggedInUser)
            return (
                <div className="profile">
                    <h1>Profile</h1>
                    <p>Username: {username}</p>
                    <p>Campus: {campus}</p>
                    <p>Course: {course}</p>
                    <button onClick={this.logoutUser}>Log out</button>
                </div>
            )            
        } else {
            return (
                <div className="profile">
                    <p>loading...</p>
                </div>
            )
        }
    }
}

export default Profile;