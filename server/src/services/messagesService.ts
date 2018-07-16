import {messagesDataAccess} from "../db";


export async function getMessage(id) {
    return await messagesDataAccess.getAllByGroup(id);
}

export async function AddMessage(message) {
    return await messagesDataAccess.add(message);
}