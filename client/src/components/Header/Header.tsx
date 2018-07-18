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

                <div className="logged-user">
                    <p>Welcome  <span className="logged-user-name">{this.props.user ? this.props.user.name : 'Guest'}</span></p>
                </div>
                <div className="dots-wrapper" ref={this.menuElement} onFocus={this.openMenu} onBlur={this.closeMenu}
                     tabIndex={0}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                    </svg>
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