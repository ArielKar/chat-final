"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controllers = require("../controllers");
var middlewares_1 = require("../middlewares/middlewares");
var usersRouter = express.Router();
usersRouter.post('/login', controllers.usersController.loginUser);
// get all users
usersRouter.get('/', middlewares_1.authCheck, controllers.usersController.getAllUsers);
// get user by id
usersRouter.get('/:userId', middlewares_1.authCheck, controllers.usersController.getUserById);
//post new user
usersRouter.post('/', controllers.usersController.addUser);
// update user by id
usersRouter.put('/:userId', middlewares_1.authCheck, controllers.usersController.updateUserById);
// delete user by id
usersRouter.delete('/:userId', middlewares_1.authCheck, controllers.usersController.deleteUserById);
exports.default = usersRouter;
//# sourceMappingURL=usersRouter.js.map