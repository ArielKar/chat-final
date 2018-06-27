"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var usersRouter = express.Router();
usersRouter.get('/', function (req, res) {
    console.log('users route >>>>>> GET');
    res.status(200).send('a user');
});
exports.default = usersRouter;
//# sourceMappingURL=users.js.map