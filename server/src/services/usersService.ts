import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import * as uuidv4 from 'uuid/v4';

import DataHandler from "../db/dataHandler";
import {IUser} from "../models/interfaces/interfaces";
import CustomError from "../helpers/customError";

class UserService {
    readonly usersDataHandler;
    readonly groupsToUsersDataHandler;

    constructor() {
        this.usersDataHandler = new DataHandler('users');
        this.groupsToUsersDataHandler = new DataHandler('groupsToUsers');
    }

    async getAll() {
        const users = await this.usersDataHandler.readFile();
        const usersArr = Object.keys(users).map(user => users[user]);
        return usersArr;
    }

    async getUser(userId) {
        const users = await this.usersDataHandler.readFile();
        if (!users[userId]) {
            throw new Error('Invalid request: user does not exist');
        }
        return users[userId];
    }

    async addUser(data) {
        let {name, age, password} = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: IUser = Object.assign({_id: uuidv4()}, {name, age, password: hashedPassword});
        const users = await this.usersDataHandler.readFile();
        // TODO: check if username / email is taken
        users[newUser._id] = newUser;
        const writingResult = await this.usersDataHandler.writeFile(users);
        if (!writingResult) {
            throw new Error('Something went wrong writing the file');
        }
        return newUser;
    }

    async getUsersByGroup(groupId) {
        const groupsToUsers = await this.groupsToUsersDataHandler.readFile();
        return groupsToUsers[groupId];
    }

    async updateUser(userId, newProps): Promise<IUser> {
        const users = await this.usersDataHandler.readFile();
        const userToUpdate = users[userId];
        if (!userToUpdate) {
            throw new Error('Invalid request: user does not exist');
        }
        for (let prop in newProps) {
            if (userToUpdate.hasOwnProperty(prop) && !!newProps[prop]) {
                if (prop === "password") {
                    userToUpdate[prop] = await bcrypt.hash(newProps[prop], 10);
                } else {
                    userToUpdate[prop] = newProps[prop];
                }
            }
        }
        const result = await this.usersDataHandler.writeFile(users);
        if (result) {
            return userToUpdate;
        } else {
            throw new Error('something went wrong writing the file');
        }
    }

    async deleteUser(userId): Promise<boolean> {
        const users = await this.usersDataHandler.readFile();
        if (!users[userId]) {
            throw new CustomError('Invalid request: user does not exist', 404);
        }
        delete users[userId];
        const writeResult = await this.usersDataHandler.writeFile(users);
        if (!!writeResult) {
            return true;
        } else {
            throw new Error('something went wrong writing the file');
        }
    }

    async authenticate(data) {
        const users = await this.usersDataHandler.readFile();
        let foundUser;
        for (let user in users) {
            if (users[user].name === data.name) {
                foundUser = users[user];
            }
        }
        if (!foundUser) {
            // when no such user
            throw new CustomError('Invalid user credentials', 401);
        } else {
            const result = await bcrypt.compare(data.password, foundUser.password);
            if (!result) {
                // when user found but password wont match
                throw new CustomError('Invalid user credentials', 401);
            }
            const token = jwt.sign({
                id: foundUser._id,
                name: foundUser.name
            }, config.get('JWT_SECRET'), {expiresIn: '1h'});
            return {foundUser, token};
        }
    }
}

export default new UserService();