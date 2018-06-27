"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var routes = require("./routes");
var middlewares_1 = require("./middlewares/middlewares");
var customError_1 = require("./helpers/customError");
var app = express();
app.use(express.json());
app.use(cors());
app.use('/users', routes.usersRouter);
app.use('/groups', middlewares_1.authCheck, routes.groupsRouter);
app.use('/messages', middlewares_1.authCheck, routes.messagesRouter);
app.use(function (req, res, next) {
    var error = new customError_1.default('Bad request', 404);
    next(error);
});
app.use(function (error, req, res, next) {
    res.status(error.status || 500).json({
        error: error.message
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map