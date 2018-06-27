import {Request, Response} from "express";
import * as services from '../services';
import {IRequest} from "../models/interfaces/interfaces";
import {RequestWithAuth} from "../helpers/RequestWithAuth";

//TODO: req.body and params validation
class GroupsController {

    static async getAllGroups(req: Request, res: Response) {
        try {
            const data = await services.GroupsService.getAll();
            res.status(200).json({
                message: 'Fetched all groups',
                data: data
            });
        } catch (err) {
            res.status(404).json({
                error: err.message
            });
        }
    }

    static async getPrivateGroups(req: Request, res: Response) {
        try {
            const privateGroups = await services.GroupsService.getPrivateGroups();
            console.log(privateGroups);
            res.status(200).json({
                message: 'Fetched private Groups',
                data: privateGroups
            });
        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    static async getGroupsAsTree(req: IRequest, res: Response) {
        try {
            const data = await services.GroupsService.getTree(req.userAuth);
            res.status(200).json({
                message:'Fetched tree data',
                data
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: err.message
            });
        }
    }

    static async getGroupById(req: Request, res: Response) {
        try {
            const data = await services.GroupsService.getGroup(req.params.groupId);
            res.status(200).json({
                message: 'Fetched one group',
                data: data
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    static async addGroup(req: RequestWithAuth, res: Response) {
        try {
            const data = await services.GroupsService.addGroup(req.body, req.userAuth);
            res.status(200).json({
                message: 'Group created',
                data: data
            });
        } catch (err) {
            console.log('In addGroup: ', err.message);
            res.status(500).json({
                error: err.message
            });
        }
    }

    static async updateGroupById(req: Request, res: Response) {

    }

    static async deleteGroupById(req: Request, res: Response) {
        //    TODO: implement
    }
}

export default GroupsController;