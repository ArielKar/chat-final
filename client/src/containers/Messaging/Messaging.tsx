import * as React from 'react';

import './Messaging.css';

import Messages from "../../components/Messages/Messages";
import NewMessage from "./NewMessage/NewMessage";

class Messaging extends React.Component<any, any> {

    addNewMessageHandler = (value: string) => {
        if (!this.props.conversation) return;
        const newMsg = this.createNewMsgObj(value);
        this.props.addNewMessage(newMsg);
    };

    createNewMsgObj(messageBody: string) {
        return {
            sender: this.props.user,
            recipient: this.props.conversation.id,
            body: messageBody,
            time: this.getTime()
        };
    }

    getTime() {
        return new Date().toLocaleTimeString();
    }

    render() {
        return (
            <div className="messaging">
                <Messages messages={this.props.messages} user={this.props.user}/>
                <NewMessage addNewMessage={this.addNewMessageHandler} />
            </div>
        );
    }
}

export default Messaging;