import * as React from 'react';
import './NewMessage.css';
import {createRef} from "react";
import {INewMsgProps, INewMsgState} from "../../../entities";

class NewMessage extends React.Component<INewMsgProps, INewMsgState> {
    inputElement: any;
    constructor(props: any) {
        super(props);
        this.inputElement = createRef();
        this.state = {
            inputValue: ""
        }

    }

    inputChangeHandler = (e: any) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            if (!!this.inputElement.current.textContent) {
                this.props.addNewMessage(this.inputElement.current.innerHTML);
                this.clearInput();
                return;
            } else {
                e.preventDefault();
            }
        }
    };

    clearInput = (e?: any) => {
        if (!!e && e.keyCode === 13 && !e.shiftKey) {
            this.inputElement.current.innerHTML = '';
        }
    };

    addButtonHandler = (e: any) => {
        if (!this.inputElement.current.textContent) {
            this.inputElement.current.focus();
            return;
        }
        if(e.type === 'click') {
            this.props.addNewMessage(this.inputElement.current.textContent);
            this.inputElement.current.innerHTML = '';
        }
        this.inputElement.current.focus();
    };

    render() {
        return (
            <div className="newMessage">
                <div contentEditable={true} ref={this.inputElement} className="input" onKeyDown={this.inputChangeHandler} onKeyUp={this.clearInput}/>
                <button  className="add" type="button" onClick={this.addButtonHandler}>+</button>
            </div>
        );
    }
}

export default NewMessage;