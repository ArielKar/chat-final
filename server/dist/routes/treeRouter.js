"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controllers = require("../controllers");
var treeRouter = express.Router();
treeRouter.get('/', controllers.treeController);
exports.default = treeRouter;
//# sourceMappingURL=treeRouter.js.map