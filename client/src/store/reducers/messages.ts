import {IState} from "../../entities";
import {actionTypes} from "../actions";
import {AnyAction} from "redux";
import {initialState} from "../store";

function reducer(state: IState = initialState, action: AnyAction): IState {
    switch (action.type) {
        case actionTypes.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload.messages
            };
        case actionTypes.ADD_MESSAGE:
            const messages = state.messages || [];
            const updatedMessages = messages.concat(action.payload.message);
            return {
                ...state,
                messages: updatedMessages
            };
        case actionTypes.LOGOUT:
            return {
                ...initialState
            };
    }
    return state;
}

export default reducer;