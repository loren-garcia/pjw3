import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return { color: "#ff9900" };
    }else {
        return { color: "#000000" };
    }
};

const Menu = ({ history }) => (
    <div>
        <Link style={isActive(history, "/")} to="/">HOME</Link>
        <Link style={isActive(history, "/signin")} to="/signin">SignIn</Link>
        <Link style={isActive(history, "/signup")} to="/signup">SignUp</Link>
        <a onClick={() => signout(() => {
            history.push('/');
        })}>SignOut</a>
    </div>
);

export default withRouter(Menu);
