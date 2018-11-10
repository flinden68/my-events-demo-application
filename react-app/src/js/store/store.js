import {createStore, applyMiddleware} from 'redux';
import reducer from "../reducers/index";
import thunk from 'redux-thunk';
import {GET_EVENTS} from "../constants/action-types";
const store = createStore(reducer, applyMiddleware(thunk));

export default store;

/*store.dispatch({
    type: GET_EVENTS,
    payload: {
        "title":"boe211v",
        "description":"boe211",
        "start_date":1538438400000,
        "end_date":1539648000000,
        "userId":"5545454",
        "created":"2018-10-30T10:01:41.762Z",
        "modified":"2018-10-30T10:01:41.762Z"
    }
})*/

