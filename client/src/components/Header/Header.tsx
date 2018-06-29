import * as React from 'react';

import './Header.css';

import Button from "../Button/Button";
import {IHeaderProps} from "../../entities";
import store from "../../appStore/store";
import {LOGOUT, SET_MODE, deleteGroup} from "../../appStore/actions";
import {Component} from "react";

class Header extends Component<IHeaderProps, any> {
    menuElement;
    constructor(props) {
        super(props);
        this.state = {
            isMenuShown: false
        };
        this.menuElement = React.createRef();
    }

    onLogout = () => {
        store.dispatch({type: LOGOUT})
    };

    openMenu = () => {
        this.setState({
            isMenuShown: true
        });
    };

    closeMenu = () => {
        this.setState({
            isMenuShown: false
        });
    };

    onMenuItemClicked = (e) => {
        store.dispatch({type: SET_MODE, payload: {mode: e.target.id}});
        this.menuElement.current.blur();
    };

    deleteSelectedItem = () => {
        this.menuElement.current.blur();
        store.dispatch(deleteGroup());
    };

    render() {
        return (
            <div className="header">
                <div className="logo">
                    <img src="./logo.png" alt="chat-logo"/>
                </div>
                <div className="logged-user">
                    <p>Welcome <span className="logged-user-name">{this.props.user}</span></p>
                    <Button text={"Logout"} type={"button"} class={"login-btn"} click={this.onLogout}/>
                </div>
                <div className="dots-wrapper" ref={this.menuElement} onFocus={this.openMenu} onBlur={this.closeMenu} tabIndex={0}>
                    <div className="dot"/>
                    <div className="dot"/>
                    <div className="dot"/>
                    {this.state.isMenuShown ?
                        <div className="menu">
                            <ul>
                                <li className="new-group-item" id="newGroup" onClick={this.onMenuItemClicked}>New group</li>
                                <li id="addUser" onClick={this.onMenuItemClicked}>Add</li>
                                <li id="edit" onClick={this.onMenuItemClicked}>Edit</li>
                                <li id="delete" onClick={this.deleteSelectedItem}>Delete</li>
                            </ul>
                        </div> : null}
                </div>
            </div>
        );
    }
};

export default Header;