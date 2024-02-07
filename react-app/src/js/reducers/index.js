import { combineReducers } from 'redux'
import events from "./events";
import { localizeReducer } from 'react-localize-redux';
import reducerAuth from "./account";

export default combineReducers({
    localize: localizeReducer,
    events,
    auth: reducerAuth
})
