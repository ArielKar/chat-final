import * as React from 'react';
import Tree from "./Tree/Tree";
import Messaging from "../Messaging/Messaging";
import NewGroup from "../../components/NewGroup/NewGroup";
import {IUser} from "../../../../server/src/models/interfaces/interfaces";
import UsersManager from "../../components/UsersManager/UsersManager";
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import * as thunks from "../../store/thunks";

class Chat extends React.Component<any, any> {

    renderDecider = () => {
        switch (this.props.mode) {
            case "manageUsers":
                return <UsersManager users={this.props.users}
                                     closeManager={this.props.onCancel}
                                     addUser={this.props.addUser}
                                     updateUser={this.props.updateUser}
                                     deleteUser={this.props.deleteUser}
                />;
            case "newGroup":
                return <NewGroup mode={"new"}
                                 name={""}
                                 users={this.props.users}
                                 conversation={this.props.conversation}
                                 usersOfGroup={[]}
                                 addNewGroup={this.props.addNewGroup}
                                 updateGroup={this.props.updateGroup}
                                 onCancel={this.props.onCancel}
                />;
            case "edit":
                if (!this.props.conversation) break;
                const userIds = this.props.conversation.users;
                if (userIds) {
                    const users = this.props.conversation.users;
                    return <NewGroup mode={"edit"}
                                     name={this.props.conversation.name}
                                     users={this.props.users}
                                     conversation={this.props.conversation}
                                     usersOfGroup={users}
                                     addNewGroup={this.props.addNewGroup}
                                     updateGroup={this.props.updateGroup}
                                     onCancel={this.props.onCancel}
                    />;
                }
        }
        return <Messaging user={this.props.user}
                              conversation={this.props.conversation}
                              messages={this.props.messages}
                              addNewMessage={this.props.addNewMessage}
            />;
    };

    render() {
        return (
            <div className="chat">
                <Tree tree={this.props.tree}
                      setConversation={this.props.setConversation}/>
                {this.renderDecider()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {user, users, tree, conversation, messages, mode} = state;
    return {
        user,
        users,
        tree,
        conversation,
        messages,
        mode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCancel: () => dispatch(actions.setMode(undefined)),
        addUser: (newUser) => dispatch(thunks.addUser(newUser)),
        updateUser: (changedUser) => dispatch(thunks.updateUser(changedUser)),
        deleteUser: (id) => dispatch(thunks.deleteUser(id)),
        addNewGroup: (newGroup) => dispatch(thunks.addNewGroup(newGroup)),
        updateGroup: (updatedGroup) => dispatch(thunks.updateGroup(updatedGroup)),
        addNewMessage: (newMsg) => dispatch(thunks.addNewMessage(newMsg)),
        setConversation: (selectedElementID) => dispatch(thunks.setConversation(selectedElementID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);