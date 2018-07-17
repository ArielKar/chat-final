import {actionTypes} from "../actions";
import {IState} from "../../entities";
import {AnyAction} from "redux";
import {initialState} from "../store";

function reducer(state: IState = initialState, action: AnyAction): IState {
    switch (action.type) {
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
        case actionTypes.SET_USERS:
            return {
                ...state,
                users: action.payload.users
            };
        case actionTypes.LOGOUT:
            return {
                ...initialState
            };
    }
    return state;
}

export default reducer;