import * as React from 'react';

import './Messages.css';

import Message from "./Message/Message";

const Messages = (props: any) => {

    const render = () => {
        if (!props.messages || props.messages === []) {
            return <div className="inform">Send a message to start a conversation</div>;
        } else {
            return props.messages.map((message: any, idx) => {
                return <Message key={idx + 1} type={props.user.name === message.sender ? "sent" : "received"}
                                sender={message.sender} messageBody={message.body} time={message.time}/>
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