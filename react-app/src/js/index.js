import React from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import store from "./store/store";
import App from "./components/App";
import {LocalizeProvider} from 'react-localize-redux';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <LocalizeProvider store={store}>
            <App />
        </LocalizeProvider>
    </Provider>
);
