import accountApi from "../../service/account";

// state
const state = {
    current: null
}

// getters
const getters = {
    getCurrent: (state) => {
        return state.current
    }
}

// actions
const actions = {
    create(commit, account){
        accountApi.createAccount(account)
            .subscribe( response => {
                commit('create', response.data)
            })
    },
    update(commit, account){
        accountApi.updateAccount(account._id, account)
            .subscribe( response => {
                commit('update', response.data)
            })
    },
    delete(commit, account){
        accountApi.deleteAccount(account)
            .subscribe( response => {
                commit('delete', response.data)
            })
    },
    fetchById(commit, account){
        accountApi.fetchAccountById(account._id)
            .subscribe( response => {
                commit('fetch', response.data)
            })
    },
    fetchByEmail(commit, account){
        accountApi.fetchAccountByEmail(account.email)
            .subscribe( response => {
                commit('fetch', response.data)
            })
    },
    logout(commit){
        commit('logout');
    }
}

//mutations
const mutations = {
    create({state}, action){
        state.current = action;
    },

    update({state}, action){
        state.current = action;
    },

    delete({state}){
        state.current = null;
    },

    fetch({state}, action){
        state.current = action;
    },

    logout({state}){
        state.current = null;
    }


}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}