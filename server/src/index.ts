import * as http from 'http';
import * as socketIo from 'socket.io';

import app from './app';

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("It\'s Alive!!!!", socket.id);

    socket.on('postMessage', (data) => {
        console.log("incomming!!!", data);

        io.sockets.emit('receiveMessage', data);
    });
});

server.listen(4000, () => console.log("server started on: http://localhost:4000"));