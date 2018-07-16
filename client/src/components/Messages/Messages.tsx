import * as React from 'react';

import './Messages.css';

import Message from "./Message/Message";

const Messages = (props: any) => {

    const render = () => {
        if (!props.messages || props.messages.length == 0) {
            return <div className="inform">Send a message to start a conversation</div>;
        } else {
            return props.messages.map((message: any) => {
                return <Message key={message._id} type={props.user._id === message.sender._id ? "sent" : "received"}
                                sender={message.sender.name} messageBody={message.body} time={message.time}/>
            });
        }
    };

    return (
        <div className="messages">
            {render()}
        </div>
    );
};

export default Messages;