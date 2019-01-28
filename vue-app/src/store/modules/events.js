import eventsApi from "../../service/events";

// state
const state = {
    all: []
}

// getters
const getters = {
    getEvents: (state) => {
        return state.all
    },

    getEventById: (state, id) => {
        return state.all.find(event => event._id = id);
    }
}

// actions
const actions = {
    addEvent({commit}, event) {
        eventsApi.createEvent(event)
            .subscribe(response => {
                    commit('addEvent', response.data)
                }
            )
    },

    updateEvent({commit}, event) {
        eventsApi.updateEvent(event._id, event)
            .subscribe(response => {
                    commit('updateEvent', response.data)
                }
            )
    },

    deleteEvent({commit}, event) {
        eventsApi.deleteEvent(event)
            .subscribe(response => {
                    commit('deleteEvent', response.data)
                }
            )
    },

    getAllEventsByUserId({commit}, userId) {
        eventsApi.fetchaAllEventsByUserId(userId)
            .then(response => {
                //console.log("RESPONSE: " + JSON.stringify(events))
                    commit('getAllEventsByUserId', response.data)
                }
            )
    }
}

// mutations
const mutations = {
    addEvent({state}, action){
        [...state.all, action]
    },

    updateEvent(state, action){
        [...state.all.filter(event => event._id !== action._id, action)];
    },

    deleteEvent({state}, action) {
        state.all.filter(event => event._id !== action._id);
    },

    getAllEventsByUserId(state, events) {
        //console.log("RESPONSE: " + JSON.stringify(events))
        state.all = events;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
