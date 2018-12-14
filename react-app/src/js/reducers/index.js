import { combineReducers } from 'redux'
import events from "./events";
import account from "./account";
import { localizeReducer } from 'react-localize-redux';

export default combineReducers({
    localize: localizeReducer,
    events,
    account
})