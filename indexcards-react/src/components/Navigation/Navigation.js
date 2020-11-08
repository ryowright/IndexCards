import React, { Component } from 'react';
import './Navigation.css';

class Navbar extends Component {
    render () {
        return (
            <div>
                <ul id="nav">
                    <li><a id="login" href="/accounts/login">Login</a></li>
                    <li><a id="cardsets" href="/cardsets">Cardsets</a></li>
                </ul>
            </div>
        )
    }
}

export default Navbar