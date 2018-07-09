import {AnyAction, applyMiddleware, createStore} from "redux";
import * as thunk from 'redux-thunk';
import {IState} from "../entities";
import {actionTypes} from "./actions";

const initialState: IState = {
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
    // user: userReducer,

};

// const rootRducer = combineReducers(reducersMap);

function rootReducer(state: IState, action: AnyAction): IState {
    switch (action.type) {
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                token: action.payload.token
            };
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload.user
            };
        case actionTypes.SET_TREE:
            return {
                ...state,
                tree: action.payload.tree
            };
        case actionTypes.SET_CONVERSATION:
            return {
                ...state,
                conversation: action.payload.conversation
            };
        case actionTypes.SET_USERS_GROUP:
            return {
                ...state,
                conversation: Object.assign({...state.conversation}, {users: action.payload.users})
            };
        case actionTypes.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload.messages
            };
        case actionTypes.ADD_MESSAGE:
            const messages = state.messages || [];
            const updatedMessages = messages.concat(action.payload.newMessage);
            return {
                ...state,
                messages: updatedMessages
            };
        case actionTypes.LOGOUT: {
            return {
                ...initialState
            }
        }
        case actionTypes.SET_MODE: {
            return {
                ...state,
                mode: action.payload.mode
            }
        }
        case actionTypes.SET_USERS: {
            return {
                ...state,
                users: action.payload.users
            }
        }
    }
    return state;
}

export const store = createStore(rootReducer, initialState, applyMiddleware(thunk.default));