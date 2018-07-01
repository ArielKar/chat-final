import * as React from 'react';

import './Messages.css';

import Message from "./Message/Message";
import {IMessagesProps} from "../../entities";
import store from '../../appStore/store';


const Messages = (props: IMessagesProps) => {
    let result: any;

    if (!props.messages || props.messages === []) {
        result = <div className="inform">Send a message to start a conversation</div>;
    } else {
        result = props.messages.map((message: any, idx) => {
            return <Message key={idx+1} type={store.getState().user.name === message.sender ? "sent" : "received"} sender={message.sender} messageBody={message.body} time={message.time}/>
        });
    }


    return (
        <div className="messages">
            {result}
        </div>
    );
};

export default Messages;