import {Group} from "./group";
import User from "./user";

export class Tree {
    root: Group;
    count = 0;

    constructor(head: Group) {
        this.root = head;
    }

    getRoot() {
        return this.root;
    }

    addGroup(group: Group, parent?: Group) {
        if (!parent) {
            if(this.root.getChildren()[group.getName()]) {
                return false;
            }
            this.root.addChild(group);
            this.count++;
            return true;
        }
        if (parent.getChildren()[group.getName()]) {
            return false;
        }
        parent.addChild(group);
        this.count++;
        return true;
    }

    deleteGroup(parent: Group, target: string) {
        delete parent.getChildren()[target];
        return true;
    }

    addUser(user: User, parent: Group) {
        return parent.addUser(user);
    }

    deleteUser(user: User, parent: Group) {
        return parent.removeUser(user);
    }

    toString(callback: (level: string[]) => void) {
        toStringH(this.root);
        function toStringH(node: Group) {
            let level = [];
            if (Object.keys(node.getChildren()).length === 0) {
                return;
            }
            level.push(node.getName());
            const children = node.getChildren();
            for (let group in children) {
                level.push(group);
            }
            callback(level);
            for (let group in children) {
                toStringH(children[group]);
            }
        }
    }

    getParentByPath(path: string, deleteMode: boolean) {
        let currNode: Group | {[key:string]: Group};
        if (!path) {
            return this.root;
        }
        let pathArr = path.split(',');
        if (deleteMode) {
            var target = pathArr.pop();
        }
        currNode = this.root.getChildren();
        for (var i=0; i < pathArr.length-1; i++) { //hoisting of i is necessary
            currNode = currNode[pathArr[i]].getChildren();
        }
        currNode = currNode[pathArr[i]];
        if(deleteMode) {
            currNode = currNode ? currNode : this.root;
            if (!!currNode && !!target) {
                return {parent: currNode, target: target};
            }
            return false;
        }
        if (!!currNode) {
            return currNode;
        }
        return false;
    }

    search(groupname: string, username: string) {
        let pathArr: string[] = [];
        let str = '';
        searchH(this.root);
        return str;

        function searchH(node: Group) {
            pathArr.push(node.getName());
            if (!!groupname && node.getName() === groupname) {
                buildStr(pathArr);
            }

            if(Tree.getNumOfChildren(node) === 0) {
                if (!!username && node.getUsers().length !== 0) {
                    let users = node.getUsers();
                    let userIndex = users.findIndex((user) => {
                        return user.getName() === username;
                    });
                    if (userIndex !== -1) {
                        buildStr(pathArr);
                    }
                }
                pathArr.pop();
                return;
            }

            const children = node.getChildren();
            for (let group in children) {
                searchH(children[group]);
            }
            pathArr.pop();
        }

        function buildStr(pathArr: string[]) {
            for (var i=0; i < pathArr.length-1; i++) {
                str += `${pathArr[i]} => `;
            }
            str += `${pathArr[i]}\n`;
        }
    }

    getReducedTree() {
        let data;
        data = getReducedTreeH(this.root);
        return data;
        // TODO: create entity to the returned object
        function getReducedTreeH(node: Group) {
            const childrenRes = [];
            let countRes = 0;
            if (Tree.getNumOfChildren(node) === 0) {
                return {
                    name: node.getName(),
                    children: [],
                    userCount: node.getUserCount(),
                    users: node.getUsers()
                };
            }
            let children = node.getChildren();
            for ( let group in children) {
                const res: any = getReducedTreeH(children[group]);
                childrenRes.push(res);
                countRes += res.userCount;
            }

            return {
                name: node.getName(),
                children: childrenRes,
                userCount: countRes,
                users: []
            };
        }
    }
    //
    toFlat(node: Group) {
        let curr = node;
        while(Tree.getNumOfChildren(curr) === 1) {
            let children = curr.getChildren();
            curr = children[Object.keys(children)[0]];
        }
        if (Tree.getNumOfChildren(curr) > 1) {
            return false;
        }
        node.setUsers(curr.getUsers());
        node.setChildren({});
        return true;
    }

    dfs(callback: (node?: Group) => void) {
        dfsH(this.root);
        function dfsH(node: Group) {
            callback(node);
            if(Tree.getNumOfChildren(node) === 0) {
                return;
            }
            const children = node.getChildren();
            for (let group in children) {
                dfsH(children[group]);
            }
        }
    }

    static getNumOfChildren(node: Group) {
        return Object.keys(node.getChildren()).length;
    }

    /*
    bfs(callback) {
        var queue = [root];
        var nextNode;

        while (queue.length > 0) {
            nextNode = queue.shift();
            callback(nextNode);

            if (Object.keys(nextNode.getChildren()).length === 0) {
                continue;
            }
            var children = nextNode.getChildren();
            for (let group in children) {
                queue.push(children[group]);
            }
        }
    }
*/

}