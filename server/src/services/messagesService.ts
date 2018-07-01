import DataHandler from "../db/dataHandler";
import * as uuidv4 from 'uuid/v4';


class MessagesService {
    readonly messagesDataHandler;

    constructor() {
        this.messagesDataHandler = new DataHandler('messages');
    }

    async getMessage(id) {
        const messages = await this.messagesDataHandler.readFile();
        return messages[id];
    }

    async AddMessage(message) {
        const messages = await this.messagesDataHandler.readFile();
        message._id = uuidv4();
        messages[message.recipient] = messages[message.recipient] || [];
        messages[message.recipient].push(message);
        await this.messagesDataHandler.writeFile(messages);
        return message;
    }
}

export default new MessagesService();