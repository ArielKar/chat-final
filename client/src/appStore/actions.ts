import * as serverAPI from '../serverApi/serverAPI';

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER = "SET_USER";
export const SET_ERROR = "SET_ERROR";
export const SET_TREE = "SET_TREE";
export const SET_CONVERSATION = "SET_CONVERSATION";
export const SET_MESSAGES = "SET_MESSAGES";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_MODE = "SET_MODE";
export const SET_USERS = "SET_USERS";
export const SET_USERS_GROUP = "SET_USERS_GROUP";

export function setConversation(selectedElementID: Number) {
    return async function(dispatch: Function) {
        dispatch({type: SET_CONVERSATION, payload: {conversation: selectedElementID}});
        const messages = await serverAPI.getMessages();
        dispatch({type: SET_MESSAGES, payload: {messages}});
    }
}

export function setConversationUsers(selectedElement) {
    return async function(dispatch: Function) {
        const users = await serverAPI.getUserOfGroup(selectedElement.id);
        dispatch({type: SET_USERS_GROUP, payload: {users}});
    }
}

export function getPrivateGroups() {
    return async function(dispatch: Function) {
        const users = await serverAPI.getPrivateGroups();
        dispatch({type: SET_USERS, payload: {users}})
    }
}

export function addNewMessage(msgArray) {
    return async function(dispatch: Function) {
        // dispatch({type: ADD_MESSAGE, payload: {msgArray}});
        await serverAPI.postMessage(msgArray);
    }
}

export function addNewGroup(newGroup) {
    return async function(dispatch: Function) {
        const addedGroup = await serverAPI.postGroup(newGroup);
        await serverAPI.getTree();
    }
}

export function updateGroup(groupToUpdate: object) {
    return async function(dispatch: Function) {
        const updatedGroup = await serverAPI.updateGroup(groupToUpdate);
        await serverAPI.getTree();
    }
}

export function deleteGroup() {
    return async function(dispatch: Function) {
        await serverAPI.deleteGroup();
        await serverAPI.getTree();
    }
}

export function addUser(newUser) {
    return async function(dispatch: Function) {
        const createdUser = await serverAPI.addUser(newUser);
        const users = await serverAPI.getPrivateGroups();
        dispatch({type: SET_USERS, payload: {users}})

    }
}

export function updateUser(changedUser) {
    return async function(dispatch: Function) {
        const updatedUser = await serverAPI.updateUser(changedUser);
        const users = await serverAPI.getPrivateGroups();
        dispatch({type: SET_USERS, payload: {users}})

    }
}

export function deleteUser(userId) {
    return async function(dispatch: Function) {
        const deleted = await serverAPI.deleteUser(userId);
        const users = await serverAPI.getPrivateGroups();
        dispatch({type: SET_USERS, payload: {users}})
    }
}