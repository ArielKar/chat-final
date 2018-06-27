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

export function setConversation(selectedElementID: Number) {
    return async function(dispatch: Function) {
        dispatch({type: SET_CONVERSATION, payload: {conversation: selectedElementID}});
        const messages = await serverAPI.getMessages();
        dispatch({type: SET_MESSAGES, payload: {messages}});
    }
}

export function getPrivateGroups() {
    return async function(dispatch: Function) {
        const users = await serverAPI.getPrivateGroups();
        console.log(users);
        dispatch({type: SET_USERS, payload: {users}})
    }
}

export function addNewMessage(msgArray) {
    return async function(dispatch: Function) {
        dispatch({type: ADD_MESSAGE, payload: {msgArray}});
        const savedMessage = await serverAPI.postMessage(msgArray);
        console.log(savedMessage);
    }
}

export function addNewGroup(newGroup) {
    return async function(dispatch: Function) {
        const addedGroup = await serverAPI.postGroup(newGroup);
        await serverAPI.getTree();
    }
}