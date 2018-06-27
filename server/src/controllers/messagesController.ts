import {Request, Response} from "express";
import * as services from '../services';


class MessagesController {

    static async getMessagesById(req: Request, res: Response) {
        try {
            const messages = await services.MessagesService.getMessage(req.params.conversation);
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
}

export default MessagesController;