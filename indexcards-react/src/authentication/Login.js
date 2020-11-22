import React, {Component} from 'react';
import { login } from '../actions/auth';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './authentication.css';

class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        if (this.props.isAuthenticated){
            return <Redirect to="/"/>
        }

        const {username, password} = this.state;
        return (
            <div className="loginpage">
                <h1>Login</h1>
                <div className="loginbox">
                    <form method="post" onSubmit={this.handleSubmit}>
                        <input className="log-username" name="username" value={username} placeholder="Enter Username" onChange={this.onChange} required />
                        <input className="log-password" name="password" value={password} type="password" placeholder="Enter Password" onChange={this.onChange} required />
                        <button className="log-submit-btn" type="submit">Login</button>
                    </form>
                    <p>Don't have an account? Register <Link id="register" to="/account/register">here</Link></p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, { login })(Login);