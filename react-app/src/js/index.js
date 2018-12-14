import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from 'react-router-dom'
import store from "./store/store";
import App from "./components/App";
import history from './history'
import { LocalizeProvider} from 'react-localize-redux';

render(
    <Provider store={store}>
        <LocalizeProvider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </LocalizeProvider>
    </Provider>,
    document.getElementById("app")
);