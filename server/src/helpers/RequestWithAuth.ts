import {Request} from 'express';

export interface RequestWithAuth extends Request {
    userAuth: Object;
}