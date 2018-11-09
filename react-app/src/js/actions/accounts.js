import {
    ADD_ACCOUNT,
    ADD_EVENT, DELETE_ACCOUNT,
    DELETE_EVENT, GET_ACCOUNT,
    GET_EVENT,
    GET_EVENTS,
    GET_EVENTS_BY_USERUID, UPDATE_ACCOUNT,
    UPDATE_EVENT
} from "../constants/action-types";
import axios from 'axios';
import history from '../history';

const apiUrl = 'http://localhost:3030/api';

//export const addEvent = event => ({ type: ADD_EVENT, payload: event });
//export const deleteEvent = event => ({ type: DELETE_EVENT, payload: event });

//export const getEvents = events => ({ type: GET_EVENTS, payload: events });

export const createAccount = (account) => {
    return (dispatch) => {
        return axios.post(`${apiUrl}/account/create`, event)
            .then(response => {
                dispatch(createAccountSuccess(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const createAccountSuccess =  (data) => {
    return {
        type: ADD_ACCOUNT,
        payload: data
    }
};

export const updateAccount = (id, account) => {
    return (dispatch) => {
        return axios.put(`${apiUrl}/account/update/${id}`, account)
            .then(response => {
                dispatch(updateAccountSuccess(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const updateAccountSuccess =  (data) => {
    return {
        type: UPDATE_ACCOUNT,
        payload: data
    }
};

export const deleteAccountSuccess = account => {
    return {
        type: DELETE_ACCOUNT,
        payload: event
    }
}

export const deleteAccount = account => {
    return (dispatch) => {
        return axios.delete(`${apiUrl}/account/delete/${account._id}`)
            .then(response => {
                dispatch(deleteAccountSuccess(account))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const fetchAccountSuccess = (account) => {
    return {
        type: GET_ACCOUNT,
        payload: account
    }
};

export const fetchAccountByEmail = email => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/account/${email}`)
            .then(response => {
                dispatch(fetchAccountSuccess(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};


export const fetchAccountById = id => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/account/${id}`)
            .then(response => {
                dispatch(fetchAccountSuccess(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};