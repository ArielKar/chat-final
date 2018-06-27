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

    async addGroup(rawNewGroup, userAuth)/*: Promise<IGroup>*/ {
        // TODO: check if already name of group exist on same level
        console.log(rawNewGroup);
        console.log("---------------------------");
        const {name, parent, isPrivate, users: usersOfNewGroup} = rawNewGroup;

        // creating new parent group
        const newGroup = {_id: uuidv4(), name, parent, isPrivate};
        const groups = await this.groupsDataHandler.readFile();
        groups[newGroup._id] = newGroup;
        // await this.groupsDataHandler.writeFile(groups);

        // creating groupsToUsers association for the new group
        const groupsToUsers = await this.groupsToUsersDataHandler.readFile();
        groupsToUsers[newGroup._id] = usersOfNewGroup.concat([userAuth.id]);
        // await this.groupsToUsersDataHandler.writeFile(groupsToUsers);

        // creating users array for newGroup
        const groupsToGroups = await this.groupsToGroupsDataHandler.readFile();
        groupsToGroups[newGroup._id] = [];

        // creating a private group for each user of usersOfGroup
        const self = this;
        console.log("USERS OF NEW GROUP: ", usersOfNewGroup);
        await Promise.all(usersOfNewGroup.map(async (userId) => {
            // if (userId === userAuth.id) {
            //     return;
            // }
            // creating private group for each userId
            console.log(userId);
            const newPrivateGroup = {_id: uuidv4(), isPrivate: true, name: null, parent: newGroup._id};
            console.log(newPrivateGroup);
            // const groups = await self.groupsDataHandler.readFile();
            groups[newPrivateGroup._id] = newPrivateGroup;
            // await self.groupsDataHandler.writeFile(groups);

            // creating association in groupsToUsers
            // const groupsToUsers = await self.groupsToUsersDataHandler.readFile();
            groupsToUsers[newPrivateGroup._id] = [userId, userAuth.id];
            // await self.groupsToUsersDataHandler.writeFile(groupsToUsers);

            // creating association between parentGroup to privateGroup in GroupsToGroups
            groupsToGroups[newGroup._id].push(newPrivateGroup._id);
            // await self.groupsToGroupsDataHandler.writeFile(groupsToGroups);
        }));
        await self.groupsToGroupsDataHandler.writeFile(groupsToGroups);
        await self.groupsToUsersDataHandler.writeFile(groupsToUsers);
        await self.groupsDataHandler.writeFile(groups);






        // const newGroup: IGroup = Object.assign({_id: Date.now()}, {name, isPrivate, parent});
        // const groups = await this.groupsDataHandler.readFile();
        // groups[newGroup._id] = newGroup;
        // // associate newGroup and its parent
        // if (newGroup.parent) {
        //     const groupsToGroups = await this.groupsToGroupsDataHandler.readFile();
        //     groupsToGroups[newGroup.parent] = groupsToGroups[newGroup.parent] ? groupsToGroups[newGroup.parent].push(newGroup._id) : [newGroup._id];
        //     await this.groupsToGroupsDataHandler.writeFile(groupsToGroups);
        // }
        // // associate newGroup and its users
        // const groupsToUsers = await this.groupsToUsersDataHandler.readFile();
        // groupsToUsers[newGroup._id] = usersOfNewGroup;
        // await this.groupsToUsersDataHandler.writeFile(groupsToUsers);
        // await this.groupsDataHandler.writeFile(groups);
        // return newGroup;
    }

    async updateGroup() {

    }

    async deleteGroup() {

    }
}

export default new GroupsService();