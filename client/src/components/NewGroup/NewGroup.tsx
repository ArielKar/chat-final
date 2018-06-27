import * as React from 'react';
import {Component} from "react";

import './NewGroup.css';
import Button from "../Button/Button";
import * as actions from '../../appStore/actions';
import store from '../../appStore/store';


class NewGroup extends Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            insertion: undefined,
            usersOptions: store.getState().users,
            addedUsers: [],
            isPrivate: undefined
        };
    }

    getUsersOptions = () => {
        return this.state.usersOptions.map((user) => <option value={user.name} key={user._id}>{user.name}</option>);
    };

    getAddedUsers = () => {
        return this.state.addedUsers.map((user) => <p key={user._id}><i>{user.name}</i></p>);
    };

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    onSelectType = (e) => {
        if (e.target.value === 'public') {
            this.setState({
                isPrivate: false
            });
        }
        if (e.target.value === 'private') {
            if (this.state.addedUsers.length > 2) {
                this.setState({
                    isPrivate: true,
                    usersOptions: this.state.usersOptions.concat(this.state.addedUsers),
                    addedUsers: []
                });
            } else {
                this.setState({
                    isPrivate: true
                });
            }
        }
    };

    onInsertionChange = (e) => {
        if (!e.target.value || e.target.value === 'root') {
            this.setState({
                insertion: null
            });
        } else {
            this.setState({
                insertion: e.target.value
            });
        }
    };

    onSelectUser = (e) => {
        console.log(e.target.value);
        if (!e.target.value) {
            return;
        }
        const index = this.state.usersOptions.findIndex(user => user.name === e.target.value);
        const addedUser = {...this.state.usersOptions[index]};
        const copiedState = {...this.state};
        copiedState.addedUsers.push(addedUser);
        copiedState.usersOptions.splice(index, 1);
        this.setState({
            ...copiedState
        });
    };

    onSave = () => {
        const newGroup = {
            name: this.state.name,
            parent: this.state.insertion,
            isPrivate: this.state.isPrivate,
            users: this.state.addedUsers.map(user => user._id)
        };
        store.dispatch(actions.addNewGroup(newGroup));
    };

    onCancel = () => {
        store.dispatch({type: actions.SET_MODE, payload: {mode: undefined}})
    };

    render() {
        return (
            <div className="new-group">
                <form className="new-group-form">
                    <h3>Create New Group</h3>
                    <p className="form-control">
                        <label htmlFor="name">Enter name:</label><br/>
                        <input type="text" name="name" onChange={this.onNameChange}/>
                    </p>
                    <p className="form-control">
                        <label htmlFor="type">Choose type:</label><br/>
                        <select name="type" onChange={this.onSelectType}>
                            <option value=""/>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </p>
                    <p className="form-control">
                        <label htmlFor="level">Choose insertion level:</label><br/>
                        <select name="level" onChange={this.onInsertionChange}>
                            <option value=""/>
                            <option value="root">Root</option>
                            <option value={store.getState().conversation}>Selected Group</option>
                        </select>
                    </p>
                    {this.state.isPrivate && this.state.addedUsers.length >= 2 ? null :
                        <div>
                            <p className="form-control">
                                <label htmlFor="user-select">Select users:</label><br/>
                                <select name="user-select" value="" onChange={this.onSelectUser}>
                                    <option value=""/>
                                    {this.getUsersOptions()}
                                </select>
                            </p>
                        </div>
                    }
                    <div>
                        <p>Your selected users:</p>
                        {this.getAddedUsers()}
                    </div>
                    <hr/>
                    <Button text={"Save"} type={"button"} class={"login-btn"} click={this.onSave}/>
                    <Button text={"Cancel"} type={"button"} class={"login-btn"} click={this.onCancel}/>
                </form>
            </div>
        );
    }
}

export default NewGroup;