"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controllers = require("../controllers");
var groupsRouter = express.Router();
groupsRouter.get('/', controllers.GroupsController.getAllGroups);
groupsRouter.get('/private', controllers.GroupsController.getPrivateGroups);
groupsRouter.get('/tree', controllers.GroupsController.getGroupsAsTree);
groupsRouter.get('/:groupId', controllers.GroupsController.getGroupById);
groupsRouter.post('/', controllers.GroupsController.addGroup);
groupsRouter.put('/:groupId', controllers.GroupsController.updateGroupById);
groupsRouter.delete('/:groupId', controllers.GroupsController.deleteGroupById);
exports.default = groupsRouter;
//# sourceMappingURL=groupsRouter.js.map