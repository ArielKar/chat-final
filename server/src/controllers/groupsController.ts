import {Request, Response} from "express";
import * as services from '../services';
import {IRequest} from "../models/interfaces/interfaces";
import {RequestWithAuth} from "../helpers/RequestWithAuth";

//TODO: req.body and params validation
export async function getAllGroups(req: Request, res: Response) {
    try {
        const data = await services.groupsService.getAll();
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

export async function getPrivateGroups(req: Request, res: Response) {
    try {
        const privateGroups = await services.groupsService.getPrivateGroups();
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

export async function getUsersOfGroup(req: Request, res: Response) {
    try {
        const users = await services.groupsService.getUsersOfGroup(req.params.groupId);
        res.status(200).json({
            message: 'Fetched users of group',
            data: users
        });
    } catch (err) {
        res.status(err.status || 500).json({
            error: err.message
        });
    }
}

export async function getGroupsAsTree(req: IRequest, res: Response) {
    try {
        const data = await services.groupsService.getTree(req.userAuth);
        res.status(200).json({
            message: 'Fetched tree data',
            data
        });
    } catch (err) {
        res.status(err.status || 500).json({
            error: err.message
        });
    }
}

export async function getRootGroups(res: Response, req: Request) {
    try {
        const rootGroups = await services.groupsService.getRootGroups();
        // console.log(rootGroups);
    } catch (err) {
        res.status(err.status || 500).json({
            error: err.message
        });
    }
}

export async function getGroupsOfParent(req: Request, res: Response) {
    try {
        const groups = await services.groupsService.getGroupsOfParent(req.params.parentId);
        res.status(200).json({
            message: "Fetched requested groups",
            data: groups
        });
    } catch (err) {
        res.status(err.status || 500).json({
           error: err.message
        });
    }
}

export async function getGroupById(req: Request, res: Response) {
    try {
        const data = await services.groupsService.getGroup(req.params.groupId);
        res.status(200).json({
            message: 'Fetched one group',
            data: data
        });
    } catch (err) {
        console.log(err.message);
    }
}

export async function addGroup(req: RequestWithAuth, res: Response) {
    try {
        const data = await services.groupsService.addGroup(req.body, req.userAuth);
        res.status(200).json({
            message: 'Group created',
            data: data
        });
    } catch (err) {
        res.status(err.status || 500).json({
            error: err.message
        });
    }
}

export async function updateGroupById(req: RequestWithAuth, res: Response) {
    try {
        const updatedGroup = await services.groupsService.updateGroup(req.params.groupId, req.body, req.userAuth);
        res.status(200).json({
            message: "group updated",
            data: updatedGroup
        });
    } catch (err) {
        res.status(err.status || 500).json({
            error: err.message
        });
    }
}

export async function deleteGroupById(req: Request, res: Response) {
    try {
        await services.groupsService.deleteGroup(req.params.groupId);
        res.status(200).json({
            message: "Group deleted successfully"
        });
    } catch (err) {
        res.status(err.status || 500).json({
            error: err.message
        });
    }
}