import store from "src/appStore/store";
import * as actionTypes from '../appStore/actions';
import io from 'socket.io-client';

const BASE_URL = 'http://localhost:4000';
let socket;

export async function login(name: string, password: string) {
    try {
        const body = JSON.stringify({name, password});
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        });
        if (response.status === 200) {
            socket = io(`${BASE_URL}`);
            socket.on("receiveMessage", handleReceivedMessages);
            const data = await response.json();
            store.dispatch({type: actionTypes.SET_USER, payload: {user: data.user}});
            store.dispatch({type: actionTypes.LOGIN});
            store.dispatch({type: actionTypes.SET_TOKEN, payload: {token: data.token}});
            store.dispatch(actionTypes.getPrivateGroups());
            getTree();
        } else {
            store.dispatch({type: actionTypes.SET_ERROR, payload: {error: 'Invalid credentials'}});
        }
    } catch (err) {
        console.log(err);
    }
}

export async function getTree() {
    try {
        const {token} = store.getState();
        const response = await fetch(`${BASE_URL}/groups/tree`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            const parsedResponse = await response.json();
            store.dispatch({type: actionTypes.SET_TREE, payload: {tree: parsedResponse.data}});
        }
    } catch (err) {
        store.dispatch({type: actionTypes.SET_ERROR, payload: {error: 'Oh oh, something went wrong'}});
    }
}

export async function getMessages() {
    try {
        const {token} = store.getState();
        const {conversation} = store.getState();
        const response = await fetch(`${BASE_URL}/messages/${conversation.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            const messages = await response.json();
            return new Promise((resolve) => {
                resolve(messages.data);
            });
        } else {
            return new Promise((resolve) => {
                resolve(undefined);
            });
        }
    } catch (err) {
        console.log(err);
        return new Promise((resolve) => {
            resolve(undefined);
        });
    }
}

export async function getPrivateGroups() {
    try {
        const {token} = store.getState();
        const usersResponse = await fetch(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (usersResponse.status === 200) {
            const users = await usersResponse.json();
            return new Promise(resolve => {
                resolve(users.data);
            });
        }
    } catch (err) {
        console.log(err);
        return new Promise((resolve, reject) => {
            resolve(undefined);
        });
    }
}

export async function postGroup(newGroup) {
    try {
        const {token} = store.getState();
        const postGroupResponse = await fetch(`${BASE_URL}/groups`, {
            method: "POST",
            body: JSON.stringify(newGroup),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const resData = await postGroupResponse.json();
        console.log(resData);
    } catch (err) {
        console.log(err.message);
    }
}

export async function updateGroup(updatedGroup) {
    try {
        const {token, conversation} = store.getState();
        const updateResponse = await fetch(`${BASE_URL}/groups/${conversation.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedGroup),
            headers: {
                Authorization: `Brearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    } catch (err) {
        console.log(err.message);
    }
}

export async function getUserOfGroup(groupId) {
    try {
        const {token} = store.getState();
        const usersResponse = await fetch(`${BASE_URL}/users/group/${groupId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const users = await usersResponse.json();
        return users.data;
    } catch (err) {
        console.log(err);
    }
}

export async function deleteGroup() {
    try {
        const {token, conversation} = store.getState();
        const deleteResponse = await fetch(`${BASE_URL}/groups/${conversation.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        console.log(err.message);
    }
}

export async function addUser(newUser) {
    try {
        const {token} = store.getState();
        const addUserResponse = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const createdUser = await addUserResponse.json();
        console.log(createdUser);
    } catch (err) {
        console.log(err.message);
    }
}

export async function updateUser(changedUser) {
    try {
        const {token} = store.getState();
        const updateResponse = await fetch(`${BASE_URL}/users/${changedUser._id}`, {
            method: "PUT",
            body: JSON.stringify(changedUser),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const updatedUser = await  updateResponse.json();
        return updatedUser.data;
        
    } catch (err) {
        console.log(err.message);
    }
}

export async function deleteUser(userId) {
    try {
        const {token} = store.getState();
        const deleteResponse = await fetch(`${BASE_URL}/users/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        console.log(err.message);
    }
}

export async function postMessage(msgArray) {
    try {
        socket.emit("postMessage", msgArray);
    } catch (err) {
        console.log(err.message);
    }
}

async function handleReceivedMessages(newMessage) {
    try {
        const {conversation} = store.getState();
        if (conversation && conversation.id === newMessage.recipient) {
            store.dispatch({type: actionTypes.ADD_MESSAGE, payload: {newMessage}});
        }
    } catch (err) {
        console.log(err.message);
    }
}