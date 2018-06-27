import * as express from 'express';
import * as controllers from '../controllers';

const messagesRouter = express.Router();

messagesRouter.get('/:conversation', controllers.MessagesController.getMessagesById);

export default messagesRouter;