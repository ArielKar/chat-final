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
        const newMsg = this.createNewMsgObj(value); //array of 2 messages - new and echo
        store.dispatch(actions.addNewMessage(newMsg));
        // ConversationsHandler.addMessageToConversation(newMsg);
    };

    createNewMsgObj(messageBody: string) {
        return [
            {
                sender: this.props.user,
                body: messageBody,
                time: this.getTime()
            },
            {
                sender: 'Echo',
                body: messageBody,
                time: this.getTime()
            }
        ];
    }

    getTime() {
        return new Date().toLocaleTimeString();
    }

    render() {
        return (
            <div className="messaging">
                <Messages messages={this.props.messages}/>
                <NewMessage addNewMessage={this.addNewMessageHandler}/>
            </div>
        );
    }
}

export default Messaging;