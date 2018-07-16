import * as express from 'express';
import * as controllers from '../controllers';
import {authCheck} from '../middlewares/middlewares';

const usersRouter = express.Router();

usersRouter.post('/login', controllers.usersController.loginUser);
// get all users
usersRouter.get('/', authCheck, controllers.usersController.getAllUsers);
// get user by id
usersRouter.get('/:userId', authCheck, controllers.usersController.getUserById);
//post new user
usersRouter.post('/', controllers.usersController.addUser);
// update user by id
usersRouter.put('/:userId', authCheck, controllers.usersController.updateUserById);
// delete user by id
usersRouter.delete('/:userId', authCheck, controllers.usersController.deleteUserById);

export default usersRouter;