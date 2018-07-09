import {actionTypes} from "./index";

export function setError(error) {
    return {
        type: actionTypes.SET_ERROR,
        payload: {
            error
        }
    };
}

export function setUser(user) {
    return {
        type: actionTypes.SET_USER,
        payload: {
            user: user
        }
    };
}

export function setToken(token) {
    return {
        type: actionTypes.SET_TOKEN,
        payload: {
            token
        }
    };
}

export function setTree(tree) {
    return {
        type: actionTypes.SET_TREE,
        payload: {
            tree
        }
    };
}

export function addMessage(message) {
    return {
        type: actionTypes.ADD_MESSAGE,
        payload: {
            message
        }
    };
}


export function logout() {
    return {
        type: actionTypes.LOGOUT
    };
}

export function setMode(mode) {
    return {
        type: actionTypes.SET_MODE,
        payload: {
            mode
        }
    };
}

export function setConversation(selectedElementID) {
    return {
        type: actionTypes.SET_CONVERSATION,
        payload: {
            conversation: selectedElementID
        }
    };
}

export function setMessages(messages) {
    return {
        type: actionTypes.SET_MESSAGES,
        payload: {
            messages
        }
    };
}

export function setUsersGroup(users) {
    return {
        type: actionTypes.SET_USERS_GROUP,
        payload: {
            users
        }
    };
}

export function setUsers(users) {
    return {
        type: actionTypes.SET_USERS,
        payload: {
            users
        }
    };
}
