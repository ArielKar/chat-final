"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var app_1 = require("./app");
var server = http.createServer(app_1.default);
server.listen(4000, function () { return console.log("server started on: http://localhost:4000"); });
//# sourceMappingURL=index.js.map