import {IState} from "../../entities";
import {actionTypes} from "../actions";
import {AnyAction} from "redux";
import {initialState} from "../store";

function reducer(state: IState = initialState, action: AnyAction): IState {
    switch (action.type) {
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        case actionTypes.SET_MODE:
            return {
                ...state,
                mode: action.payload.mode
            };
        case actionTypes.LOGOUT:
            return {
                ...initialState
            };
    }
    return state;
}

export default reducer;