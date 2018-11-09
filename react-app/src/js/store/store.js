import {createStore, applyMiddleware, combineReducers} from 'redux';
import eventsReducer from "../reducers/events";
import accountsReducer from "../reducers/accounts";
import thunk from 'redux-thunk';
const store = createStore(combineReducers({
    events: eventsReducer,
    account: accountsReducer
}), applyMiddleware(thunk));

export default store;