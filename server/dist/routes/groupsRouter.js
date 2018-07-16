"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controllers = require("../controllers");
var groupsRouter = express.Router();
groupsRouter.get('/', controllers.groupsController.getAllGroups);
groupsRouter.get('/private', controllers.groupsController.getPrivateGroups);
groupsRouter.get('/tree', controllers.groupsController.getGroupsAsTree);
groupsRouter.get('/root', controllers.groupsController.getRootGroups);
groupsRouter.get('/:groupId', controllers.groupsController.getGroupById);
groupsRouter.get('/:groupId/users', controllers.groupsController.getUsersOfGroup);
groupsRouter.get('/:parentId/groups', controllers.groupsController.getGroupsOfParent);
groupsRouter.post('/', controllers.groupsController.addGroup);
groupsRouter.put('/:groupId', controllers.groupsController.updateGroupById);
groupsRouter.delete('/:groupId', controllers.groupsController.deleteGroupById);
exports.default = groupsRouter;
//# sourceMappingURL=groupsRouter.js.map