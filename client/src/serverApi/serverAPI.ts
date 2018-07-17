import {store} from "../store/store";
import * as actions from '../store/actions';
import io from 'socket.io-client';
import {buildTree} from "../util/helpers";

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
            return await response.json();
        } else {
            store.dispatch(actions.setError('Invalid Credentials'));
        }
    } catch (err) {
        console.log(err);
    }
}

export async function getTree(token, user) {
    try {
        const response = await fetch(`${BASE_URL}/groups/tree`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            const parsedResponse = await response.json();
            return buildTree(parsedResponse.data, user);
        }
    } catch (err) {
        console.log(err);
        store.dispatch(actions.setError('Oh oh, something went wrong'));
    }
}

export async function getMessages(token, conversation) {
    try {
        const response = await fetch(`${BASE_URL}/messages/${conversation._id}`, {
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

export async function getPrivateGroups(token) {
    try {
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

export async function postGroup(newGroup, token) {
    try {
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

export async function updateGroup(updatedGroup, token, conversation) {
    try {
        const updateResponse = await fetch(`${BASE_URL}/groups/${conversation._id}`, {
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

export async function getNextGroups(groupId, token) {
    try {
        const nextGroupsRes = await fetch(`${BASE_URL}/groups/${groupId}/groups`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const nextGroups = await nextGroupsRes.json();
        console.log(nextGroups);
        return nextGroups.data;
    } catch (err) {
        console.log(err);
    }
}

export async function deleteGroup(token, conversation) {
    try {
        const deleteResponse = await fetch(`${BASE_URL}/groups/${conversation._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        console.log(err.message);
    }
}

export async function addUser(newUser, token) {
    try {
        const addUserResponse = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const createdUser = await addUserResponse.json();
    } catch (err) {
        console.log(err.message);
    }
}

export async function updateUser(changedUser, token) {
    try {
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

export async function deleteUser(userId, token) {
    try {
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

export async function postMessage(msg) {
    try {
        socket.emit("postMessage", msg);
    } catch (err) {
        console.log(err.message);
    }
}

async function handleReceivedMessages(newMessage) {
    try {
        const {conversation} = store.getState().groupsRdcr;
        if (conversation && conversation._id === newMessage.recipient._id.toString()) {
            store.dispatch(actions.addMessage(newMessage));
        }
    } catch (err) {
        console.log(err.message);
    }
}