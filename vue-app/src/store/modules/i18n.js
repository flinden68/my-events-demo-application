
// state
const state = {
    locales: ['en', 'nl'],
    locale: 'en'
}

// getters
const getters = {
    getCurrentLanguage: (state) => {
        return state.locale
    }
}

// actions
const actions = {
    setLanguage({commit}, locale){
        commit('setLanguage', locale);
    }
}

//mutations
const mutations = {
    setLanguage(state, locale) {
        state.locale = locale;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}