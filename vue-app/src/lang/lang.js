import VueI18n from 'vue-i18n'

import en from './locale/en.json'
import nl from './locale/nl.json'
import store from '../store';

const locale = store.state.i18n.locale;

const messages = {
    en,
    nl
}

const i18n = new VueI18n({
    locale,
    fallbackLocale: 'nl',
    messages,
    debug: true
})

export default i18n
