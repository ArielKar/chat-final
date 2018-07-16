import {Request, Response} from "express";
import * as services from '../services';
import {removePassword} from "../helpers/utils";


//TODO: req.body and params validation


export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await services.userService.getAll();
        res.status(200).json({
            message: 'Fetched all users',
            data: users.map(removePassword)
        });
    } catch (err) {
        console.log('In getAllUsers', err.message);
        res.status(500).json({
            error: err.message
        });
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const user = await services.userService.getUser(req.params.userId);
        res.status(200).json({
            message: 'Fetched one user',
            data: removePassword(user)
        });
    } catch (err) {
        console.log('In getUserById', err.message);
        res.status(500).json({
            error: err.message
        });
    }
}

export async function addUser(req: Request, res: Response) {
    try {
        const addedUser = await services.userService.addUser(req.body);
        res.status(200).json({
            message: 'Added user',
            data: removePassword(addedUser)
        });
    } catch (err) {
        console.log('In add user: ', err.message);
        res.status(500).json({
            error: err.message
        });
    }
}

export async function updateUserById(req: Request, res: Response) {
    try {
        const updatedUser = await services.userService.updateUser(req.params.userId, req.body);
        res.status(200).json({
            message: 'User updated',
            data: removePassword(updatedUser)
        });
    } catch (err) {
        console.log('In updateUserById: ', err.message);
        res.status(500).json({
            error: err.message
        });
    }
}

export async function deleteUserById(req: Request, res: Response) {
    try {
        const result = await services.userService.deleteUser(req.params.userId);
        res.status(200).json({
            message: 'User deleted'
        });
    } catch (err) {
        console.log("In deleteUserById", err.message);
        res.status(err.status || 500).json({
            error: err.message
        });
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const result = await services.userService.authenticate(req.body);
        res.status(200).json({
            message: 'Logged in successfully',
            user: removePassword(result.foundUser),
            token: result.token
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        });
    }
}