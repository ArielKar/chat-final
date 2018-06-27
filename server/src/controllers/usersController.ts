import {Request, Response} from "express";
import * as services from '../services';


//TODO: req.body and params validation
class UsersController {

    static async getAllUsers(req: Request, res: Response) {
        try {
            const data = await services.UserService.getAll();
            res.status(200).json({
                message: 'Fetched all users',
                data: data
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
            const data = await services.UserService.getUser(req.params.userId);
            res.status(200).json({
                message: 'Fetched one user',
                data: data
            });
        } catch (err) {
            console.log('In getUserById', err.message);
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
                data: addedUser
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
                data: updatedUser
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
            res.status(500).json({
                error: err.message
            });
        }
    }

    static async loginUser(req: Request, res: Response) {
        try {
            const result = await services.UserService.authenticate(req.body);
            res.status(200).json({
                message: 'Logged in successfully',
                user: result.foundUser,
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