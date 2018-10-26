import { ADD_EVENT, DELETE_EVENT } from "../constants/action-types";
const initialState = {
    events: []
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EVENT:
            return { state, events: [...state.events, action.payload] };
        case DELETE_EVENT:
            return {events: state.events.filter(event => event !== action.payload)}
        default:
            return state;
    }
};
export default rootReducer;
