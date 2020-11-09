import React, {Component} from 'react';
import axios from 'axios';
import { login } from '../actions/auth';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        login({username: this.state.username, password: this.state.password});

        //console.log(this.state.username)
        /*const {username, password} = this.state;
        axios.post("http://127.0.0.1:8000/account/login/",
                    {
                        username: username,
                        password: password
                    }).then((response) => console.log(response))*/
    }

    

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { username, password} = this.state;
        return (
            <div id="loginBox">
                <form method="post" onClick={this.handleSubmit}>
                    <input name="username" value={username} placeholder="Enter Username" onChange={this.onChange} required />
                    <input name="password" value={password} type="password" placeholder="Enter Password" onChange={this.onChange} required />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;