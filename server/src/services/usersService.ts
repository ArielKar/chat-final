import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

import {usersDataAccess} from '../db'
import CustomError from "../helpers/customError";

export async function authenticate(attempt) {
    const foundUser = await usersDataAccess.getByName(attempt.name);
    if (!foundUser) throw new CustomError('Invalid user credentials', 401);
    const isPassword = await bcrypt.compare(attempt.password, foundUser.password);
    if (!isPassword) throw new CustomError('Invalid user credentials', 401);
    const token = jwt.sign({
        id: foundUser._id,
        name: foundUser.name
    }, config.get('JWT_SECRET'), {expiresIn: '1h'});
    return {foundUser, token};
}

export async function getAll() {
    return await usersDataAccess.getAll();
}

export async function getUser(userId) {
    const foundUser = await usersDataAccess.getById(userId);
    if (!foundUser) throw new Error('Invalid request: user does not exist');
    return foundUser;
}

export async function addUser(data) {
    let {name, age, password} = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {name, age, password: hashedPassword};
    // TODO: check if username / email is taken
    return await usersDataAccess.add(newUser);
}

export async function updateUser(userId, newProps) {
    const updatedUser = await usersDataAccess.updateById(userId, newProps);
    if (!updatedUser) {
        throw new Error('Invalid request: user does not exist');
    }
    return updatedUser;
}

export async function deleteUser(userId) {
    const isDeleted = await usersDataAccess.deleteById(userId);
    if (!isDeleted) throw new CustomError('Invalid request: user does not exist', 404);
    return true;
}