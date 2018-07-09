import * as React from 'react';
import {Component} from 'react';

import './NewGroup.css';
import Button from "../Button/Button";

class NewGroup extends Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            mode: this.props.mode,
            name: this.props.name,
            insertionLevel: undefined,
            usersOptions: (this.props.users as Array<any>).filter(user => !this.props.usersOfGroup.includes(user)),
            addedUsers: this.props.usersOfGroup,
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
                insertionLevel: null
            });
        } else {
            this.setState({
                insertionLevel: e.target.value
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
                parent: this.state.insertionLevel,
                isPrivate: this.state.isPrivate,
                users: this.state.addedUsers.map(user => user._id)
            };
            this.props.addNewGroup(newGroup);
        } else {
            console.log(this.state.addedUsers);
            const updatedGroup = {
                name: this.state.name,
                users: this.state.addedUsers.map(user => user._id)
            };
            this.props.updateGroup(updatedGroup);
        }
    };

    onCancel = () => {
        this.props.onCancel();
    };

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                mode: nextProps.mode,
                name: nextProps.name,
                addedUsers: nextProps.usersOfGroup,
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
                                { this.props.conversation ?
                                <option value={this.props.conversation.id}>Current selected group</option> : null }
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