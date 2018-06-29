import DataHandler from "../db/dataHandler";
import * as uuidv4 from 'uuid/v4';
import {IGroup} from "../models/interfaces/interfaces";
import {generateTree} from "../helpers/utils";


class GroupsService {
    readonly groupsDataHandler;
    readonly groupsToUsersDataHandler;
    readonly groupsToGroupsDataHandler;
    readonly usersDataHandler;

    constructor() {
        this.groupsDataHandler = new DataHandler('groups');
        this.groupsToUsersDataHandler = new DataHandler('groupsToUsers');
        this.groupsToGroupsDataHandler = new DataHandler('groupsToGroups');
        this.usersDataHandler = new DataHandler('users');
    }

    async getAll(): Promise<{}> {
        return this.groupsDataHandler.readFile();
    }

    async getTree(userData): Promise<{}> {
        const groups = await this.groupsDataHandler.readFile();
        const groupsToGroups = await this.groupsToGroupsDataHandler.readFile();
        const groupsToUsers = await this.groupsToUsersDataHandler.readFile();
        const users = await this.usersDataHandler.readFile();
        const tree = generateTree(groups, groupsToGroups, users, groupsToUsers, userData);
        return tree;
    }

    async getGroup(groupId: number): Promise<IGroup> {
        const groups = await this.groupsDataHandler.readFile();
        if (!groups[groupId]) {
            throw new Error('Group does not exist');
        }
        return groups[groupId];
    }

    async getPrivateGroups(): Promise<Array<IGroup>> {
        const groups = await this.groupsDataHandler.readFile();
        const privateGroups = Object.keys(groups).map(group => groups[group]).filter(group => group.isPrivate);
        return privateGroups;
    }

    async addGroup(rawNewGroup, userAuth): Promise<IGroup> {
        // TODO: check if already name of group exist on same level
        const {name, parent, isPrivate, users: usersOfNewGroup} = rawNewGroup;

        // creating new parent group
        const newGroup = {_id: uuidv4(), name, parent, isPrivate};
        const groups = await this.groupsDataHandler.readFile();
        groups[newGroup._id] = newGroup;

        // creating groupsToUsers association for the new group
        const groupsToUsers = await this.groupsToUsersDataHandler.readFile();
        groupsToUsers[newGroup._id] = usersOfNewGroup.concat([userAuth.id]);

        // creating users array for newGroup
        const groupsToGroups = await this.groupsToGroupsDataHandler.readFile();
        groupsToGroups[newGroup._id] = [];
        if (newGroup.parent) {
            groupsToGroups[newGroup.parent].push(newGroup._id);
        }
        // creating a private group for each user of usersOfGroup
        const self = this;
        await Promise.all(usersOfNewGroup.map(async (userId) => {

            // creating private group for each userId
            const newPrivateGroup = {_id: uuidv4(), isPrivate: true, name: null, parent: newGroup._id};
            groups[newPrivateGroup._id] = newPrivateGroup;

            // creating association in groupsToUsers
            groupsToUsers[newPrivateGroup._id] = [userId, userAuth.id];

            // creating association between parentGroup to privateGroup in GroupsToGroups
            groupsToGroups[newGroup._id].push(newPrivateGroup._id);
        }));
        await self.groupsToGroupsDataHandler.writeFile(groupsToGroups);
        await self.groupsToUsersDataHandler.writeFile(groupsToUsers);
        await self.groupsDataHandler.writeFile(groups);

        return newGroup;
    }

    async updateGroup(updatedGroup) {

    }

    async deleteGroup(groupId) {
        // delete the group from groups
        const groups = await this.groupsDataHandler.readFile();
        const groupToDelete = groups[groupId];
        delete groups[groupToDelete._id];

        // delete group to users assoc.
        const groupsToUsers = await this.groupsToUsersDataHandler.readFile();
        delete groupsToUsers[groupToDelete._id];

        // delete group to group assoc.
        const groupsToGroups = await this.groupsToGroupsDataHandler.readFile();
        if (groupsToGroups[groupToDelete._id]) {
            await Promise.all(groupsToGroups[groupToDelete._id].map(async (groupId) => {
                delete groups[groupId];
            }));
            delete groupsToGroups[groupToDelete._id];
        }
        if (groupToDelete.parent) {
            let index = groupsToGroups[groupToDelete.parent].findIndex(group => group === groupToDelete._id);
            groupsToGroups[groupToDelete.parent].splice(index, 1);
        }
        await this.groupsDataHandler.writeFile(groups);
        await this.groupsToUsersDataHandler.writeFile(groupsToUsers);
        await this.groupsToGroupsDataHandler.writeFile(groupsToGroups);
    }
}

export default new GroupsService();