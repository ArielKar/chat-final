import {Request, Response} from "express";
import * as services from '../services';
import {removePassword} from "../helpers/utils";


//TODO: req.body and params validation
class UsersController {

    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await services.UserService.getAll();
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

    static async getUserById(req: Request, res: Response) {
        try {
            const user = await services.UserService.getUser(req.params.userId);
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

    static async getUsersByGroup(req: Request, res: Response) {
        try {
            const users = await services.UserService.getUsersByGroup(req.params.groupId);
            res.status(200).json({
                message: 'Fetched users by group',
                data: users
            });
        } catch (err) {
            console.log("IN getUsersByGroup", err.message);
            res.status(500).json({
                error: err.message
            });
        }
    }

    static async addUser(req: Request, res: Response) {
        try {
            const addedUser = await services.UserService.addUser(req.body);
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

    static async updateUserById(req: Request, res: Response) {
        try {
            const updatedUser = await services.UserService.updateUser(req.params.userId, req.body);
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

    static async deleteUserById(req: Request, res: Response) {
        try {
            const result = await services.UserService.deleteUser(req.params.userId);
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

    static async loginUser(req: Request, res: Response) {
        try {
            const result = await services.UserService.authenticate(req.body);
            res.status(200).json({
                message: 'Logged in successfully',
                user: removePassword(result.foundUser),
                token: result.token
            });
        } catch (err) {
            res.status( err.status || 500).json({
                message: err.message
            });
        }
    }
}

export default UsersController;