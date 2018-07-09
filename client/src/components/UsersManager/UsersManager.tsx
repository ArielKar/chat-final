import * as React from 'react';
import {Component} from 'react';
import './UserManager.css';
import FormControl from "../FormControl/FormControl";
import Button from "../Button/Button";

class UsersManager extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            addForm: false,
            newUserName: undefined,
            newUserAge: undefined,
            newUserPassword: undefined,
            editedAge: undefined,
            editedPassword: undefined
        };
    }

    // new user handling
    closeManager = () => {
        this.props.closeManager();
    };

    onAddClicked = () => {
        this.setState({
            addForm: true
        });
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSave = () => {
        const {newUserName: name, newUserAge: age, newUserPassword: password} = this.state;
        const newUser = {name, age, password};
        this.props.addUser(newUser);
    };

    onCancel = () => {
        this.setState({
            addForm: false
        });
    };

    // edited user handling
    onUserEditFieldChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSaveEditedHandler = (id) => {
        const {editedAge, editedPassword} = this.state;
        if (!editedAge && !editedPassword) {
            //    TODO: show error
            return;
        }
        const changedUser = {_id: id, age: editedAge, password: editedPassword};
        this.props.updateUser(changedUser);
    };

    onDeleteHandler = (id: string): void => {
        this.props.deleteUser(id);
    };

    buildUsers = () => {
        return [...this.props.users].map((user: any) => {
            return <li key={user._id} className="user-item">
                <div className="user-item-details">
                    <span>{user.name} ({user.age})</span>
                </div>
                <div className="user-item-edit">
                    <FormControl name={"editedAge"} label={"Age"} placeholder={"Enter new age"}
                                 onChange={this.onUserEditFieldChange}/>
                    <FormControl name={"editedPassword"} label={"Password"} placeholder={"Enter new password"}
                                 onChange={this.onUserEditFieldChange}/>
                </div>
                <div className="user-item-buttons">
                    <button className="login-btn" name="save"
                            onClick={this.onSaveEditedHandler.bind(this, user._id)}>Save
                    </button>
                    <button className="login-btn" name="delete"
                            onClick={this.onDeleteHandler.bind(this, user._id)}>Delete
                    </button>
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
                            <FormControl name={"newUserPassword"} label={"Password"}
                                         placeholder={"Enter password here..."}
                                         onChange={this.onInputChange}/>
                            <Button class={"login-btn"} click={this.onSave} type={"button"} text={"Save"}/>
                            <Button class={"login-btn"} click={this.onCancel} type={"button"} text={"Cancel"}/>
                        </form> : null}
                </div>
                <ul>
                    {this.buildUsers()}
                </ul>
            </div>
        );
    }
}

export default UsersManager;