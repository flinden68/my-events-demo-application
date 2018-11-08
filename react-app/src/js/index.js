import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from 'react-router-dom'
import store from "./store/index";
import App from "./components/App";
import history from './history'

render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById("app")
);