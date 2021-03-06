import * as React from 'react';
import {ChangeEvent} from 'react';
import './Login.css';

import FormControl from "../../components/FormControl/FormControl";
import Button from "../../components/Button/Button";

interface ILoginState {
    usernameInput?: string,
    passwordInput?: string,
    isValid: boolean
}

interface ILoginProps {
    login: (name: string, password:string) => void
}

class Login extends React.Component<ILoginProps, ILoginState> {
    errorMsg: string;
    constructor(props) {
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
        this.props.login(this.state.usernameInput, this.state.passwordInput);
    };

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <img src="./logo.png" alt="logo"/>
                    <FormControl name={"usernameInput"} placeholder={"Ariel"} label={"Username"} onChange={this.handleInputs}/>
                    <FormControl name={"passwordInput"} placeholder={"123456"} label={"Password"} onChange={this.handleInputs}/>
                    <hr/>
                    <Button text={"Login"} type={"button"} class={"login-btn"} click={this.validateLogin} isDisabled={!this.state.isValid}/>
                    {!this.state.isValid ? <p style={{color: 'red'}}>{this.errorMsg}</p> : null}
                </div>
            </div>
        );
    }
}

export default Login;