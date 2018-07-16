"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controllers = require("../controllers");
var messagesRouter = express.Router();
messagesRouter.get('/:conversation', controllers.messagesController.getMessagesById);
exports.default = messagesRouter;
//# sourceMappingURL=messagesRouter.js.map