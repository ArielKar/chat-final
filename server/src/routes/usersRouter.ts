import * as express from 'express';
import * as controllers from '../controllers';
import {authCheck} from '../middlewares/middlewares';

const usersRouter = express.Router();

usersRouter.post('/login', controllers.UsersController.loginUser);
// get all users
usersRouter.get('/', authCheck, controllers.UsersController.getAllUsers);
// get user by id
usersRouter.get('/:userId', authCheck, controllers.UsersController.getUserById);
usersRouter.get('/group/:groupId', authCheck, controllers.UsersController.getUsersByGroup);
//post new user
usersRouter.post('/', controllers.UsersController.addUser);
// update user by id
usersRouter.put('/:userId', authCheck, controllers.UsersController.updateUserById);
// delete user by id
usersRouter.delete('/:userId', authCheck, controllers.UsersController.deleteUserById);

export default usersRouter;