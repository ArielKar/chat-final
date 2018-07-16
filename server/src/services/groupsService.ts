import {buildTree} from "../helpers/utils";
import {groupsDataAccess} from '../db';
import CustomError from "../helpers/customError";

export async function getAll(): Promise<{}> {
    return await groupsDataAccess.getAll();
}

export async function getTree(userData) {
    const users = await groupsDataAccess.getAll();
    return users;
    // return buildTree(users, userData);
}

export async function getGroup(groupId) {
    const foundGroup = await groupsDataAccess.getById(groupId);
    if (!foundGroup) {
        throw new CustomError('Group does not exist', 404);
    }
    return foundGroup;
}

export async function getPrivateGroups() {
    return await groupsDataAccess.getPrivateGroups();
}

export async function getUsersOfGroup(groupId) {
    const group = await getGroup(groupId);
    return group.users;
}

export async function getGroupsOfParent(parentId) {
    return await groupsDataAccess.getGroupsOfParent(parentId);
}

export async function getRootGroups() {
    return await groupsDataAccess.getRoots();
}

export async function addGroup(rawNewGroup, userAuth) {
    // TODO: check if already name of group exist on same level
    return await groupsDataAccess.add(rawNewGroup);
}

export async function updateGroup(idToUpdate, source, userAuth) {
    const updatedGroup = await groupsDataAccess.updateById(idToUpdate, source);
    if (!updatedGroup) throw new CustomError('Invalid request: group does not exist', 404);
    return updatedGroup;
}

export async function deleteGroup(groupId) {
    const isDeleted = await groupsDataAccess.deleteById(groupId);
    if (!isDeleted) throw new CustomError('Invalid request: group does not exist', 404);
    return true;
}