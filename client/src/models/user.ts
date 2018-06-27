export interface IUser {
    username: string;
    password: string;
    age: number;
}

export default class User implements IUser{
    username: string;
    password: string;
    age: number;

    constructor(username: string, password: string, age: number) {
        this.username = username;
        this.password = password;
        this.age = age;
    }

    getName(): string {
        return this.username;
    }

    isPassword(password: string) : boolean {
        return this.password === password;
    }

    setAge(age: number): void {
        this.age = age;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    toString(): string {
        return `${this.username} (${this.age})\n`;
    }
}