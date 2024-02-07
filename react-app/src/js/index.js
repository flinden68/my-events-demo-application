import React from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import store from "./store/store";
import App from "./components/App";
import {LocalizeProvider} from 'react-localize-redux';
import globalTranslations from "./translations/global.json";
import {renderToStaticMarkup} from "react-dom/server";

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <LocalizeProvider store={store} initialize={{
            languages: [
                { name: 'English', code: 'en' },
                { name: 'Dutch', code: 'nl' }
            ],
            translation: globalTranslations,
            options: {
                renderToStaticMarkup,
                renderInnerHtml: true,
                defaultLanguage: "en"
            }
        }}>
            <App />
        </LocalizeProvider>
    </Provider>
);
