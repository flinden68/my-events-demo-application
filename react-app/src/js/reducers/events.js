import {
    ADD_EVENT,
    DELETE_EVENT,
    GET_EVENT,
    GET_EVENTS,
    GET_EVENTS_BY_USER_ID,
    UPDATE_EVENT
} from "../constants/action-types";

const events = (state = [], action) => {
    switch (action.type) {
        case ADD_EVENT:
            return [ ...state, action.payload ];
        case UPDATE_EVENT:
            return state.map(event => {
                if (event._id === action.payload._id) {
                    return {
                        ...event,
                        ...action.event
                    };
                } else {
                    return event;
                }
            });
        case DELETE_EVENT:
            return state.filter(event => event._id !== action.payload._id);
        case GET_EVENTS:
            return action.payload;
        case GET_EVENTS_BY_USER_ID:
            return action.payload;
        case GET_EVENT:
            return { state, event: action.payload };
        default:
            return state;
    }
};
export default events;
