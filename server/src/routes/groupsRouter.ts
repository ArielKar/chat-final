import * as express from 'express';
import * as controllers from '../controllers';

const groupsRouter = express.Router();

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

export default groupsRouter;