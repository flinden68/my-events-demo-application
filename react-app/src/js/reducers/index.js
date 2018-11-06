import {
    ADD_EVENT,
    DELETE_EVENT,
    GET_EVENT,
    GET_EVENTS,
    GET_EVENTS_BY_USERUID,
    UPDATE_EVENT
} from "../constants/action-types";
const initialState = {
    events: []
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EVENT:
            return { state, events: [...state.events, action.payload] };
        case UPDATE_EVENT:
            return {events: state.events.map(event => event._id !== action.payload._id ? action.payload : event)};
        case DELETE_EVENT:
            return {events: state.events.filter(event => event !== action.payload)};
        case GET_EVENTS:
            return { state, events: action.payload };
        case GET_EVENTS_BY_USERUID:
            return { state, events: action.payload };
        case GET_EVENT:
            return { state, event: action.payload };
        default:
            return state;
    }
};
export default rootReducer;
