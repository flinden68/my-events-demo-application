import {createStore, applyMiddleware} from 'redux';
import reducer from "../reducers/index";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createAccountSuccess} from "../actions/account";
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
let account = {
    "_id": "5be564d50f085f2cc19e3fef",
    "email": "flinden68@elstarit.nl",
    "_class": "nl.elstarit.event.service.model.Account",
    "created": "2018-11-09T10:43:33.649Z",
    "modified": "2018-11-09T10:43:33.649Z"
}


//store.dispatch(createAccountSuccess(account));

