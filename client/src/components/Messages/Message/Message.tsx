import * as React from 'react';

import './Message.css';
import {IMessage} from "../../../entities";

const Message = (props: IMessage) => {
    return (
        <div className={"message " + props.type}>
            <p className="sender">{props.sender}:</p>
            <h4 className="message-body" dangerouslySetInnerHTML={{__html: props.messageBody}} />
            <p className="time-stamp">{props.type}: <span>{props.time}</span></p>
        </div>
    );
};

export default Message;