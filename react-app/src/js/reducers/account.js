import {ADD_ACCOUNT, DELETE_ACCOUNT, GET_ACCOUNT, UPDATE_ACCOUNT, LOGOUT} from "../constants/action-types";

const initialState = {
    isLoggedIn: false,
    account: {}
};
const reducerAuth = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ACCOUNT:
            return {
                ...state,
                account: action.payload,
                isLoggedIn: true
            };
        case UPDATE_ACCOUNT:
            return {
                ...state,
                account: action.payload,
                isLoggedIn: true
            };
        case DELETE_ACCOUNT:
            return {
                ...state,
                account: null,
                isLoggedIn: false
            };
        case GET_ACCOUNT:
            return {
                ...state,
                account: action.payload,
                isLoggedIn: true
            };
        case LOGOUT:
            return {
                ...state,
                account: null,
                isLoggedIn: false
            };
        default:
            return {...state};
    }
};
export default reducerAuth;
