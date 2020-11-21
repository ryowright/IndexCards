import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import './authentication.css';

class Register extends Component {
    state = {
        username: "",
        password: "",
        confPassword: "",
        email: "",
    }

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
            <div className="register-page">
                <h1>Registration</h1>
                <div className="register-box">
                    <form method="post" onSubmit={this.handleSubmit}>
                        <input className="reg-username"
                            name="username"
                            value={username}
                            placeholder="Create Username"
                            onChange={this.onChange} required />
                        
                        <input className="reg-password"
                            name="password"
                            value={password}
                            type="password"
                            placeholder="Create Password"
                            onChange={this.onChange} required />
                    
                        <input className="reg-password"
                            name="confPassword"
                            value={confPassword}
                            type="password"
                            placeholder="Confirm Password"
                            onChange={this.onChange} required />
                        
                        <input className="reg-email"
                            name="email"
                            value={email}
                            type="email"
                            placeholder="Enter Email"
                            onChange={this.onChange} required />

                        <button className="reg-submit-btn" type="submit">Register</button>
                    </form>
                </div>
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