import { combineReducers } from 'redux'
import events from "./events";
import account from "./account";

export default combineReducers({
    events,
    account
})