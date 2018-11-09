import {ADD_ACCOUNT, DELETE_ACCOUNT, GET_ACCOUNT, UPDATE_ACCOUNT} from "../constants/action-types";

const initialState = {
    account: null
};
const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ACCOUNT:
            return { state, event: action.payload };
        case UPDATE_ACCOUNT:
            return { state, event: action.payload };
        case DELETE_ACCOUNT:
            return { state, event: null };
        case GET_ACCOUNT:
            return { state, event: action.payload };
        default:
            return state;
    }
};
export default accountsReducer;
