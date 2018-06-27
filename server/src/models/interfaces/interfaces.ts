import {Request} from "express";

export interface IUser {
    _id: string;
    name: string;
    age: string;
    password: string;
}

export interface IGroup {
    _id: number,
    name?: string,
    parent?: string,
    isPrivate: boolean
}

export interface IRequest extends Request {
    userAuth: object;
}