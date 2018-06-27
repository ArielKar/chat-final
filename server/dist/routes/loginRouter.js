"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var loginRouter = express.Router();
loginRouter.post('/', function (req, res) {
    console.log('In login route >>>>>>>>', req.body);
    res.status(200).send('done');
});
exports.default = loginRouter;
//# sourceMappingURL=loginRouter.js.map