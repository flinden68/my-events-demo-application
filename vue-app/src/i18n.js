import { createI18n } from "vue-i18n";
import en from './locales/en.json';
import nl from './locales/nl.json';
import store from './store';

const locale = store.state.i18n.locale;

const messages = {
    en,
    nl
}

export default createI18n({
    legacy: false,
    globalInjection: true,
    locale: locale,
    fallbackLocale: "nl",
    messages: messages,
});
