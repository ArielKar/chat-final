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
            mode: this.props.mode,
            name: this.props.name,
            insertion: undefined,
            usersOptions: (store.getState().users as Array<any>).filter(user => !this.props.users.includes(user)),
            addedUsers: this.props.users,
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
        if (this.state.mode === 'new') {
            const newGroup = {
                name: this.state.name,
                parent: this.state.insertion,
                isPrivate: this.state.isPrivate,
                users: this.state.addedUsers.map(user => user._id)
            };
            store.dispatch(actions.addNewGroup(newGroup));
        } else {
            console.log(this.state.addedUsers);
            const updatedGroup = {
                name: this.state.name,
                users: this.state.addedUsers.map(user => user._id)
            };
            store.dispatch(actions.updateGroup(updatedGroup));
        }
    };

    onCancel = () => {
        store.dispatch({type: actions.SET_MODE, payload: {mode: undefined}});
    };

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                mode: nextProps.mode,
                name: nextProps.name,
                addedUsers: nextProps.users,
            });
        }
    }

    render() {
        return (
            <div className="new-group">
                <form className="new-group-form">
                    <h3>{this.state.mode === "new" ? "Create New Group" : "Edit Group"}</h3>
                    <p className="form-control">
                        <label htmlFor="name">Enter name:</label><br/>
                        <input type="text" name="name" onChange={this.onNameChange} value={this.state.name}/>
                    </p>
                    {this.state.mode === "new" ?
                        <p className="form-control">
                            <label htmlFor="type">Choose type:</label><br/>
                            <select name="type" onChange={this.onSelectType}>
                                <option value=""/>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </p> : null}
                    {this.state.mode === "new" ?
                        <p className="form-control">
                            <label htmlFor="level">Choose insertion level:</label><br/>
                            <select name="level" onChange={this.onInsertionChange}>
                                <option value=""/>
                                <option value="root">Root</option>
                                { store.getState().conversation ?
                                <option value={store.getState().conversation.id}>Current selected group</option> : null }
                            </select>
                        </p> : null}
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