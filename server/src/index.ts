import * as http from 'http';
import * as socketIo from 'socket.io';
import * as services from './services';
import app from './app';
import * as mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/chat')
    .then(() => console.log('Database connection established...'));

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {

    socket.on('postMessage', async (data) => {
        try {
            const savedMessage = await services.messagesService.AddMessage(data);
            console.log("IN THE SOCKET:");
            console.log(savedMessage);
            io.sockets.emit('receiveMessage', savedMessage);
        } catch (err) {
            console.log(err.message);
        }
    });
});

server.listen(4000, () => console.log("server started on: http://localhost:4000"));