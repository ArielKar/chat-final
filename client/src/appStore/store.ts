import {IActionObj, IState, IActionFunc} from "../entities";
import * as actionTypes from './actions';

const initialState: IState = {
    isLoggedin: false,
    token: undefined,
    user: undefined,
    tree: undefined,
    conversation: undefined,
    messages: undefined,
    error: undefined,
    mode: undefined,
    users: undefined
};

class Store {
    state: IState = {
        isLoggedin: false,
        token: undefined,
        user: undefined,
        tree: undefined,
        conversation: undefined,
        messages: undefined,
        error: undefined,
        mode: undefined,
        users: undefined
    };
    subscriptions: Function[] = [];

    getState() {
        return this.state;
    }

    dispatch = (action: any | IActionObj | IActionFunc): void  => {
        if (typeof action === "object") {
            this.state = this.reducer(this.state, action);
            this.emit();
            // console.log(this.getState());
        }
        if (typeof action === "function") {
            this.dispatch(action(this.dispatch));
        }
    };
    // TODO: refactor and export by types
    reducer(state: IState, action: IActionObj): IState {
        switch (action.type) {
            case actionTypes.SET_ERROR:
                return {
                    ...state,
                    error: action.payload.error
                };
            case actionTypes.LOGIN:
                return {
                    ...state,
                    isLoggedin: true
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

    subscribe(fnc: Function): void {
        if (fnc) {
            this.subscriptions.push(fnc);
        }
    }

    emit(): void {
        this.subscriptions.forEach(sub => sub(this.state));
    }
}

export default new Store();