"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var socketIo = require("socket.io");
var app_1 = require("./app");
var server = http.createServer(app_1.default);
var io = socketIo(server);
io.on("connection", function (socket) {
    console.log("It\'s Alive!!!!", socket.id);
    socket.on('postMessage', function (data) {
        console.log("incomming!!!", data);
        io.sockets.emit('receiveMessage', data);
    });
});
server.listen(4000, function () { return console.log("server started on: http://localhost:4000"); });
//# sourceMappingURL=index.js.map