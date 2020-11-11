import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import './Navigation.css';

class Navbar extends Component {

    logout = (event) => {
        event.preventDefault();
        this.props.logout();
    }

    render () {
        const {isAuth, username} = this.props.auth;
        console.log(username);
        const guestLinks = ( // Add Register path
            <div>
                <ul id="nav">
                    <li><Link id="login" to="/account/login">Login</Link></li>
                    <li><Link id="register" to="/account/register">Register</Link></li>
                </ul>
            </div>
        )

        const authLinks = (
            <div>
                <ul id="nav">
                    <li><Link onClick={this.props.logout} id="logout" to="/">Logout</Link></li>
                    <li><Link to="/">CardSets</Link></li>
                    <li><a>{username ? `Welcome, ${username}` : 'No Username'}</a></li>
                </ul>
            </div>
        )
        return (
            isAuth ? authLinks : guestLinks
        )
    }
    
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });

export default connect(mapStateToProps, { logout })(Navbar);

/*

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "navbar name",
        }
    }

   render () {
    console.log(this.props.isAuthenticated);
    let loginDisp = "Logout";
    // FIX CONDITIONAL BELOW
    if(this.props.isAuthenticated){
        console.log('nav username: ')
        console.log(this.props.username);
        loginDisp = `Welcome ${this.props.username}`;
    }

    return (
        <div>
            <ul id="nav">
                <li><a id="logout" href="/account/logout">{loginDisp}</a></li>
                <li><a id="cardsets" href="/">Cardsets</a></li>
            </ul>
        </div>
    )
}
}

const mapStateToProps = state => {
return {
    isAuthenticated: state.auth.isAuth,
    username: state.auth.username,
}
}

const mapDispatchToProps = dispatch => {
return {
    loadUser: () => {
        return dispatch(loadUser())
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

*/
