import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    state = {
        username: "",
        password: "",
        confPassword: "",
        email: "",
    }

    // Could implement function to log user out if they are logged in and want to register
    //componentDidMount () {
        // function here
    //}

    // Checks if password and confPassword match before registering
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.confPassword){
            alert("Passwords do not match.");
            return;
        }
        else {
            this.props.register(this.state.username, this.state.password, this.state.email);
        }
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render () {
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }

        const {username, password, confPassword, email} = this.state;
        return (
            <div id="registerBox">
                <h1>Registration Page</h1>
                <form method="post" onSubmit={this.handleSubmit}>
                    <input name="username"
                        value={username}
                        placeholder="Enter Username"
                        onChange={this.onChange} required />
                    
                    <input name="password"
                        value={password}
                        type="password"
                        placeholder="Enter Password"
                        onChange={this.onChange} required />
                   
                    <input name="confPassword"
                        value={confPassword}
                        type="password"
                        placeholder="Confirm Password"
                        onChange={this.onChange} required />
                    
                    <input name="email"
                        value={email}
                        type="email"
                        placeholder="Enter Email"
                        onChange={this.onChange} required />

                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, { register })(Register);