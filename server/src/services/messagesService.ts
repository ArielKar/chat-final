import DataHandler from "../db/dataHandler";


class MessagesService {
    readonly messagesDataHandler;

    constructor() {
        this.messagesDataHandler = new DataHandler('messages');
    }

    async getMessage(id) {
        const messages = await this.messagesDataHandler.readFile();
        return messages[id];
    }
}

export default new MessagesService();