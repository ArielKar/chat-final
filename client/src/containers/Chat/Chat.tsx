import * as React from 'react';
import Tree from "./Tree/Tree";
import Messaging from "../Messaging/Messaging";
import {IChatProps} from "../../entities";
import store from '../../appStore/store';
import NewGroup from "../../components/NewGroup/NewGroup";

class Chat extends React.Component<IChatProps, {}> {

    constructor(props: IChatProps){
        super(props);
    }

    renderDecider = () => {
        switch(store.getState().mode) {
            case "newGroup":
                return <NewGroup />;
            case "addUser":
                return;
            case "edit":
                return;
            default:
                return <Messaging user={this.props.user} conversation={this.props.conversation} messages={this.props.messages}/>;
        }
    };

    render() {
        return (
            <div className="chat">
                <Tree tree={this.props.tree}/>
                {this.renderDecider()}
            </div>
        );
    }
}

export default Chat;