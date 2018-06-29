import * as React from 'react';
import './Login.css';

import FormControl from "../../components/FormControl/FormControl";
import Button from "../../components/Button/Button";
import {login} from '../../serverApi/serverAPI';
import {ChangeEvent} from "react";

interface ILoginState {
    usernameInput?: string,
    passwordInput?: string,
    isValid: boolean
}

class Login extends React.Component<any, ILoginState> {
    errorMsg: string;
    constructor(props: {}) {
        super(props);
        this.state = {
            usernameInput: '',
            passwordInput: '',
            isValid: true
        };
    }

    handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value,
            isValid: true
        });
    };

    validateLogin = () => {
        if (!this.state.usernameInput || !this.state.passwordInput) {
            this.errorMsg = 'Both inputs must be filled';
            this.setState({
                isValid: false
            });
            return;
        }
        login(this.state.usernameInput, this.state.passwordInput);
    };

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <img src="./logo.png" alt="logo"/>
                    <FormControl name={"usernameInput"} label={"Username"} onChange={this.handleInputs}/>
                    <FormControl name={"passwordInput"} label={"Password"} onChange={this.handleInputs}/>
                    <hr/>
                    <Button text={"Login"} type={"button"} class={"login-btn"} click={this.validateLogin} isDisabled={!this.state.isValid}/>
                    {!this.state.isValid ? <p style={{color: 'red'}}>{this.errorMsg}</p> : null}
                </div>
            </div>
        );
    }
}

export default Login;