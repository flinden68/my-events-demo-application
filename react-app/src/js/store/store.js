import reducer from "../reducers/index";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({ reducer: reducer});

export default store;
let account = {
    "_id": "5be564d50f085f2cc19e3fef",
    "email": "flinden68@elstarit.nl",
    "_class": "nl.elstarit.event.service.model.Account",
    "created": "2018-11-09T10:43:33.649Z",
    "modified": "2018-11-09T10:43:33.649Z"
}

//store.dispatch(createAccountSuccess(account));

