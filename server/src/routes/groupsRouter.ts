import * as express from 'express';
import * as controllers from '../controllers';

const groupsRouter = express.Router();

groupsRouter.get('/', controllers.GroupsController.getAllGroups);

groupsRouter.get('/private', controllers.GroupsController.getPrivateGroups);

groupsRouter.get('/tree', controllers.GroupsController.getGroupsAsTree);

groupsRouter.get('/:groupId', controllers.GroupsController.getGroupById);

groupsRouter.post('/', controllers.GroupsController.addGroup);

groupsRouter.put('/:groupId', controllers.GroupsController.updateGroupById);

groupsRouter.delete('/:groupId', controllers.GroupsController.deleteGroupById);

export default groupsRouter;