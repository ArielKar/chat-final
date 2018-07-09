import * as React from 'react';
import {Component} from 'react';

import './Header.css';

class Header extends Component<any, any> {
    menuElement;

    constructor(props) {
        super(props);
        this.menuElement = React.createRef();
        this.state = {
            isMenuShown: false
        };
    }

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
        this.menuElement.current.blur();
        this.props.setMode(e.target.id);
    };

    deleteSelectedItem = () => {
        this.menuElement.current.blur();
        this.props.deleteGroup();
    };

    render() {
        return (
            <div className="header">
                <div className="logo">
                    <img src="./logo.png" alt="chat-logo"/>
                </div>
                {this.props.user ?
                <div className="logged-user">
                    <p>Welcome <span className="logged-user-name">{this.props.user.name}</span></p>
                </div> : null}
                <div className="dots-wrapper" ref={this.menuElement} onFocus={this.openMenu} onBlur={this.closeMenu}
                     tabIndex={0}>
                    <div className="dot"/>
                    <div className="dot"/>
                    <div className="dot"/>
                    {this.state.isMenuShown ?
                        <div className="menu">
                            <ul>
                                <li id="manageUsers" onClick={this.onMenuItemClicked}>Manage users</li>
                                <li id="newGroup" onClick={this.onMenuItemClicked}>New group</li>
                                <li id="edit" onClick={this.onMenuItemClicked}>Edit</li>
                                <li id="delete" onClick={this.deleteSelectedItem}>Delete</li>
                                <li onClick={this.props.logout}>Logout</li>
                            </ul>
                        </div> : null}
                </div>
            </div>
        );
    }
}

export default Header;