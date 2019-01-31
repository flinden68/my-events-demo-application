import accountApi from "../../service/account";

// state
const state = {
    current: undefined,
    authenticated: false
}

// getters
const getters = {
    getCurrent: (state) => {
        return state.current
    },

    isAuthenticated : (state) => {
        return state.authenticated
    }
}

// actions
const actions = {
    create({commit}, account){
        accountApi.createAccount(account)
            .then( response => {
                commit('create', response.data)
            })
    },
    update({commit}, account){
        accountApi.updateAccount(account._id, account)
            .then( response => {
                commit('update', response.data)
            })
    },
    delete({commit}, account){
        accountApi.deleteAccount(account)
            .then( response => {
                commit('delete', response.data)
            })
    },
    fetchAccount({commit}, account){

        accountApi.fetchAccountById(account._id)
            .then( response => {
                if(response.status == 204){
                    commit('hasNoAccount', null, false)
                }else{
                    if(response.data.email != account.email){
                        commit('hasNoAccount', null, false)
                    }else {
                        commit('hasAccount', response.data, true)
                    }
                }
            })
    },
    fetchById(commit, account){
        accountApi.fetchAccountById(account._id)
            .then( response => {
                commit('fetch', response.data)
            })
    },
    fetchByEmail(commit, account){
        accountApi.fetchAccountByEmail(account.email)
            .then( response => {
                commit('fetch', response.data)
            })
    },
    logout({commit}){
        commit('logout');
    }
}

//mutations
const mutations = {
    create(state, action){
        state.current = action;
        state.authenticated = true
    },

    update(state, action){
        state.current = action;
        state.authenticated = true
    },

    delete(state){
        state.current = null;
    },

    hasAccount(state, account){
        state.current = account;
        state.authenticated = true
    },

    hasNoAccount(state, account){
        state.current = account;
        state.authenticated = false
    },

    logout(state){
        state.current = null;
        state.authenticated = false
    }


}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}