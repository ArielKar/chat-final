import {applyMiddleware, combineReducers, createStore} from "redux";
import * as thunk from 'redux-thunk';
import {IState} from "../entities";
import {groupsReducer, messagesReducer, statesReducer, usersReducer} from "./reducers";

export const initialState: IState = {
    token: undefined,
    user: undefined,
    tree: undefined,
    conversation: undefined,
    messages: undefined,
    error: undefined,
    mode: undefined,
    users: undefined
};

const reducersMap = {
    usersRdcr: usersReducer,
    groupsRdcr: groupsReducer,
    messagesRdcr: messagesReducer,
    statesRdcr: statesReducer

};

const rootReducer = combineReducers(reducersMap);

export const store = createStore(rootReducer, applyMiddleware(thunk.default));