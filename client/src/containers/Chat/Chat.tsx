import * as React from 'react';
import Tree from "./Tree/Tree";
import Messaging from "../Messaging/Messaging";
import {IChatProps} from "../../entities";
import store from '../../appStore/store';
import NewGroup from "../../components/NewGroup/NewGroup";
import {IUser} from "../../../../server/src/models/interfaces/interfaces";
import UsersManager from "../../components/UsersManager/UsersManager";

class Chat extends React.Component<IChatProps, {}> {

    constructor(props: IChatProps) {
        super(props);
    }

    renderDecider = () => {
        switch (this.props.mode) {
            case "manageUsers":
                return <UsersManager />;
            case "newGroup":
                return <NewGroup mode={"new"} name={""} users={[]}/>;
            case "edit":
                const userIds = store.getState().conversation.users;
                if (userIds) {
                    const users = userIds.map(userId => store.getState().users.find((user: IUser) => user._id === userId));
                    return <NewGroup mode={"edit"} name={this.props.conversation.name} users={users}/>;
                }
            default:
                return <Messaging user={this.props.user} conversation={this.props.conversation}
                                  messages={this.props.messages}/>;
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