import {ADD_ACCOUNT, DELETE_ACCOUNT, GET_ACCOUNT, UPDATE_ACCOUNT, LOGOUT} from "../constants/action-types";

const account = (state = null, action) => {
    switch (action.type) {
        case ADD_ACCOUNT:
            return action.payload;
        case UPDATE_ACCOUNT:
            return action.payload;
        case DELETE_ACCOUNT:
            return null;
        case GET_ACCOUNT:
            return action.payload;
        case LOGOUT:
            return null;
        default:
            return state;
    }
};
export default account;
