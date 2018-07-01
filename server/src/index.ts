import * as http from 'http';
import * as socketIo from 'socket.io';
import * as services from './services';

import app from './app';

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {

    socket.on('postMessage', async (data) => {
        try {
            const savedMessage = await services.MessagesService.AddMessage(data);
            io.sockets.emit('receiveMessage', savedMessage);
        } catch (err) {
            console.log(err.message);
        }
    });
    
});

server.listen(4000, () => console.log("server started on: http://localhost:4000"));