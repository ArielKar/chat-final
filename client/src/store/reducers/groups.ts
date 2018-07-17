import {actionTypes} from "../actions";
import {IState} from "../../entities";
import {AnyAction} from "redux";
import {initialState} from "../store";

function reducer(state: IState = initialState, action: AnyAction): IState {
    switch (action.type) {
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
        case actionTypes.LOGOUT:
            return {
                ...initialState
            };
    }
    return state;
}

export default reducer;