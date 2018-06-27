import {Group} from "./group";
import {Tree} from "./tree";
import User from "./user";

export class Groups {
    private groupsTree = new Tree(new Group('root'));

    //root,group1,group2,group33 =====> root.getChildren()[group1].getChildren()[group2].getChildren()[group33]
    addGroup(groupname: string, path: string) {
        const newGroup = new Group(groupname);
        if (!path) {
            const root = this.groupsTree.getRoot();
            if (root.getUsers().length !== 0) {
                const users = root.getUsers();
                root.setUsers([]);
                const others = new Group('others');
                others.setUsers(users);
                this.groupsTree.addGroup(others);
            }
            return this.groupsTree.addGroup(newGroup);
        }
        let parent: any = this.groupsTree.getParentByPath(path, false);
        console.log(parent);
        if (!!parent) {
            if (parent.getUsers().length !== 0) {
                let users = parent.getUsers();
                parent.setUsers([]);
                let others = new Group('others');
                others.setUsers(users);
                this.groupsTree.addGroup(others, parent);
            }
            return this.groupsTree.addGroup(newGroup, parent);
        }
        return false;
    }

    deleteGroup(path: string) {
        let data: any = this.groupsTree.getParentByPath(path, true);
        if (!data.parent) {
            return false;
        }
        return this.groupsTree.deleteGroup(data.parent, data.target);
    }

    addUserToGroup(user: User, path: string) {
        let parent: any = this.groupsTree.getParentByPath(path, false);
        if (Object.keys(parent.getChildren()).length !== 0) {
            //check if others already exists - update - else - create
            if (parent.getChildren()['others']) {
                return parent.getChildren()['others'].addUser(user);
            }
            let othersGroup = new Group('others');
            othersGroup.addUser(user);
            return parent.addChild(othersGroup);
        }
        return this.groupsTree.addUser(user, parent);
    }

    deleteUserFromGroup(user: User, path: string) {
        if(!path) {
            return false;
        }
        let parent: any = this.groupsTree.getParentByPath(path, false);
        return this.groupsTree.deleteUser(user, parent);
    }

    deleteUserFromAllGroups(user: User) {
        this.groupsTree.dfs((node: Group) => {
            node.removeUser(user);
        });
    }

    search(groupname: string, username: string) {
        return this.groupsTree.search(groupname, username);
    }

    toString() {
        let reducedTree = this.groupsTree.getReducedTree();
        return this.createStr(reducedTree);
    }
    // TODO: restructure the reducedTree obj and create entity for reducedTree
    createStr(reducedTree: any) {
        let str = '';
        let space = '---';
        let newline = '\n';
        createStrH(reducedTree, 0);
        return str;
        // TODO: restructure the reducedTree obj and create entity for reducedTree
        function createStrH(node: any, counter: number) {
            str += `${space.repeat(counter)} ${node.name} (${node.userCount})`;
            str += newline;
            if (node.users.length !== 0) {
                node.users.forEach( (user: User) => {
                    str += `${space.repeat(counter+1)} User: ${user.toString()}`;
                });
                return;
            }

            if (node.children.length !== 0) {
                counter++;
                node.children.forEach( (child: any) => {
                    createStrH(child, counter);
                });
            }
        }
    }

    flattening(path: string) {
        let node: any = this.groupsTree.getParentByPath(path, false);
        return this.groupsTree.toFlat(node);
    }

}