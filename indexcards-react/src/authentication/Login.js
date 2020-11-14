import React, {Component} from 'react';
import { login } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
            <div id="loginBox">
                <h1>Login Page</h1>
                <form method="post" onSubmit={this.handleSubmit}>
                    <input name="username" value={username} placeholder="Enter Username" onChange={this.onChange} required />
                    <input name="password" value={password} type="password" placeholder="Enter Password" onChange={this.onChange} required />
                    <button type="submit">Login</button>
                </form>
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