import * as React from 'react';
import {Component} from "react";
import './UserManager.css';
import store from "../../appStore/store";
import FormControl from "../FormControl/FormControl";
import Button from "../Button/Button";
import {addUser, deleteUser, SET_MODE, updateUser} from "../../appStore/actions";

class UsersManager extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            addForm: false,
            newUserName: undefined,
            newUserAge: undefined,
            newUserPassword: undefined
        };
    }

    closeManager = () => {
        store.dispatch({type: SET_MODE, payload: {mode: undefined}});
    };

    onUlClick = (e) => {
        if (e.target.name === "save") {
            const id = e._targetInst.return.return.key;
            const age = e.target.parentElement.parentElement.childNodes[1].childNodes[0].childNodes[1].value;
            const password = e.target.parentElement.parentElement.childNodes[1].childNodes[1].childNodes[1].value;
            const changedUser = {_id: id, age, password};
            store.dispatch(updateUser(changedUser));
        }
        if (e.target.name === "delete") {
            const id = e._targetInst.return.return.key;
            store.dispatch(deleteUser(id));

        }

    };

    onAddClicked = () => {
        this.setState({
            addForm: true
        });
    };

    onInputChange = (e) => {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSave = () => {
        console.log(this.state);
        const {newUserName: name, newUserAge: age, newUserPassword: password} = this.state;
        const newUser = {name, age, password};
        store.dispatch(addUser(newUser));
    };

    onCancel = () => {
        this.setState({
            addForm: false
        });
    };

    buildUsers = () => {
        return [...store.getState().users].map((user: any) => {
            return <li key={user._id} className="user-item">
                <div className="user-item-details">
                    <span>{user.name} ({user.age})</span>
                </div>
                <div className="user-item-edit">
                    <FormControl name={"age"} label={"Age"} placeholder={"Enter new age"}/>
                    <FormControl name={"password"} label={"Password"} placeholder={"Enter new password"}/>
                </div>
                <div className="user-item-buttons">
                    <button className="login-btn" name="save">Save</button>
                    <button className="login-btn" name="delete">Delete</button>
                </div>
            </li>
        });
    };

    render() {
        return (
            <div className="user-manager">
                <div>
                    <Button class={"login-btn"} text={"Close"} type={"button"} click={this.closeManager}/>
                </div>
                <h3>Users Manger</h3>
                <div className="add-user">
                    <button className="login-btn" onClick={this.onAddClicked}>Add</button>
                    {this.state.addForm ?
                        <form>
                            <FormControl name={"newUserName"} label={"Name"} placeholder={"Enter name here..."}
                                         onChange={this.onInputChange}/>
                            <FormControl name={"newUserAge"} label={"Age"} placeholder={"Enter age here..."}
                                         onChange={this.onInputChange}/>
                            <FormControl name={"newUserPassword"} label={"Password"} placeholder={"Enter password here..."}
                                         onChange={this.onInputChange}/>
                            <Button class={"login-btn"} click={this.onSave} type={"button"} text={"Save"}/>
                            <Button class={"login-btn"} click={this.onCancel} type={"button"} text={"Cancel"}/>
                        </form> : null}
                </div>
                <ul onClick={this.onUlClick}>
                    {this.buildUsers()}
                </ul>
            </div>
        );
    }
}

export default UsersManager;
