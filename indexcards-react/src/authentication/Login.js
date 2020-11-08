import React from 'react';

const Login = (props) => {
    return (
        <div id="loginBox">
            <form method="post">
                <input placeholder="Enter Username" required />
                <input type="password" placeholder="Enter Password" required />
                <button type="submit">Login</button>
            </form>

        </div>
    )
}

export default Login;