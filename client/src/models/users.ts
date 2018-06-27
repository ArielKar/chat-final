import User from "./user";

class Users {
    users: User[] = [
        new User('Ariel', '123', 30),
        new User('asd', '123', 30),
        new User('waka', '123', 30)
    ];

    addUser(username: string, password: string, age: number) {
        if (this.isAUser(username) !== -1) {
            return false;
        }
        this.users.push(new User(username, password, age));
        return true;
    }

    getUser(username: string) {
        let indexOfUser = this.isAUser(username);
        if (indexOfUser === -1) {
            return;
        }
        return this.users[indexOfUser];
    }

    removeUser(username: string) {
        let indexToRemove = this.isAUser(username);
        if (indexToRemove === -1) {
            return false;
        }
        this.users.splice(indexToRemove, 1);
        return true;
    }

    updateUser(username: string, prop: string/*setAge / setPassword*/, newValue: number | string) {
        let indexOfUser = this.isAUser(username);
        if (indexOfUser === -1) {
            return false;
        }
        this.users[indexOfUser][prop](newValue);
        return true;
    }

    toString() {
        let str = '';
        this.users.forEach(user => {
            str += `${user.toString()}`;
        });
        return str;
    }

    isAUser(username: string) {
        return this.users.findIndex(user => {
            return user.username === username;
        });
    }
}

export const UsersCtrl: Users = new Users();