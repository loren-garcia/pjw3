import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth/index';

class Signin extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    
    handleSignIn = event => {
        event.preventDefault();
        const { email, password } = this.state;
        const user = {
            email,
            password
        };

        if(email === "" || password === "") {
            this.setState({error: "Email or password cannot be empty"});
        }else {

            signin(user)
            .then(data => {
                if(data.error) {
                    this.setState({ error: data.error });
                }else {
                    authenticate(data, () => {
                        this.setState({
                            redirectToReferer: true
                        });
                    });
                }
            });
        }
    };

    render() {
        const { email, password, error, redirectToReferer } = this.state;

        if(redirectToReferer) {
            return <Redirect to="/" />;
        }

        return(
            <div id="login-area">
                <label>E-mail: <input id="email" 
                                    type="text" 
                                    onChange={this.handleChange("email")}
                                    value={email} /></label>
                <label>Senha: <input id="password" 
                                    type="password" 
                                    onChange={this.handleChange("password")}
                                    value={password} /></label>
                <button id="loginBtn" onClick={this.handleSignIn}>LOGIN</button>
                <div style={{ display: error ? "" : "none"}}>
                    {error}
                </div>
            </div>
        );
    }
}

export default Signin;