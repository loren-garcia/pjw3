import React, { Component } from 'react';
import { signup } from '../auth/index';

class Signup extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            open: false,
            redirectToReferer: false
        };
    }

    authenticate(jwt, next) {
        if(typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(jwt));
            next();
        }
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    handleSignUp = event => {
        event.preventDefault();
        const { email, password } = this.state;
        const user = {
            email,
            password
        };

        if(email === "" || password === "") {
            this.setState({error: "Email or password cannot be empty"});
        }else {
            signup(user)
            .then(data => {
                if(data.error) {
                    this.setState({error: data.error})
                }else {
                    this.setState({
                        error: "",
                        email: "",
                        password: "",
                        open: true
                    });
                }
            });
        }
    };

    handleSignIn = event => {
        event.preventDefault();
        const { email, password } = this.state;
        const user = {
            email,
            password
        };

        this.signup(user)
        .then(data => {
            if(data.error) {
                this.setState({ error: data.error })
            }else {
                this.authenticate(data, () => {
                    this.setState({
                        redirectToReferer: true
                    });
                });
            }
        });
    };

    render() {
        const { email, password, error, open } = this.state;

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
                <button id="signupBtn" onClick={this.handleSignUp}>CADASTRAR</button>
                <div style={{ display: error ? "" : "none"}}>
                    {error}
                </div>
                <div style={{ display: open ? "" : "none"}}>
                    Account created! Please sign in!
                </div>
            </div>
        );
    }
}

export default Signup;