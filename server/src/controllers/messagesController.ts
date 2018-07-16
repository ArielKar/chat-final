import {Request, Response} from "express";
import * as services from '../services';


export async function getMessagesById(req: Request, res: Response) {
    try {
        const messages = await services.messagesService.getMessage(req.params.conversation);
        res.status(200).json({
            messages: 'Fetched messages',
            data: messages
        });
    } catch (err) {
        res.status(err.status || 500).json({
            error: err.message
        });
    }
}