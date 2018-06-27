import User from "./user";

export class Group {
    groupname: string;
    children: {[key: string]: Group}; //hold other groups
    users: User[];

    constructor(groupname: string) {
        this.groupname = groupname;
        this.children = {};
        this.users = [];
    }

    getName() {
        return this.groupname;
    }

    getUserCount() {
        return this.users.length;
    }

    getChildren() {
        return this.children;
    }

    getUsers() {
        return this.users;
    }

    setUsers(users: User[]) {
        this.users = users;
    }

    setChildren(children: {[key: string]: Group}) {
        this.children = children;
    }

    addChild(group: Group) {
        let key = group.getName();
        if (this.children[key]) {
            return false;
        }
        this.children[key] = group;
        return true;
    }

    deleteChild(groupname: string) {
        delete this.children[groupname];
    }

    addUser(user: User) {
        if (this.users.indexOf(user) !== -1) {
            return false;
        }
        this.users.push(user);
        return true;
    }

    removeUser(user: User) {
        let index = this.users.indexOf(user);
        if (index === -1) {
            return false;
        }
        this.users.splice(index, 1);
        return true;
    }

    toString() {
        let str = `${this.groupname} ==> `;
        if (this.users.length !== 0) {
            this.users.forEach(user => {
                str += `${user.toString()}, `;
            });
        }
        return str;

    }
}
