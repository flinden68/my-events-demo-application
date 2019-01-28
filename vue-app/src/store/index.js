import Vue from 'vue'
import Vuex from 'vuex'
import events from './modules/events'
import account from './modules/account'
import i18n from './modules/i18n'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        events,
        account,
        i18n
    },
    debug:true
});
