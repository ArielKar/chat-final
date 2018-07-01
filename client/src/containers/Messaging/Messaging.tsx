import * as React from 'react';

import './Messaging.css';

import Messages from "../../components/Messages/Messages";
import NewMessage from "./NewMessage/NewMessage";
import {IMessagingProps, IMessagingState} from "../../entities";
import * as actions from '../../appStore/actions';
import store from '../../appStore/store';

class Messaging extends React.Component<IMessagingProps, IMessagingState> {
    constructor(props: IMessagingProps) {
        super(props);
    }

    addNewMessageHandler = (value: string) => {
        if (!this.props.conversation) return;
        const newMsg = this.createNewMsgObj(value);
        store.dispatch(actions.addNewMessage(newMsg));
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
                <Messages messages={this.props.messages}/>
                <NewMessage addNewMessage={this.addNewMessageHandler} />
            </div>
        );
    }
}

export default Messaging;