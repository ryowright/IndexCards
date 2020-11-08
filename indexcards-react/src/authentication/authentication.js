import React, { Component } from 'react';
import Login from './Login';
import Logout from './Logout';

class Authentication extends Component {
  
  
  render () {
    return (
      <div >
        <h1>Login Page</h1>
        <Login />
      </div>
    )
  }
}

export default Authentication