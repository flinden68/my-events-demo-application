import {
    ADD_ACCOUNT,
    DELETE_ACCOUNT,
    GET_ACCOUNT,
    UPDATE_ACCOUNT,
    LOGOUT
} from "../constants/action-types";
import {apiUrl} from "../constants/application";
import axios from 'axios';
import history from "../history";
import { setActiveLanguage } from "react-localize-redux";

//const apiUrl = 'http://localhost:3535/api';

//export const addEvent = event => ({ type: ADD_EVENT, payload: event });
//export const deleteEvent = event => ({ type: DELETE_EVENT, payload: event });

//export const getEvents = events => ({ type: GET_EVENTS, payload: events });

export const logout = () =>{
    return (dispatch) => {
        dispatch(logoutSuccess(null))
        history.push('/login')
    }
}

export const logoutSuccess = (languageCode) =>{
    return {
        type: LOGOUT,
        payload: {languageCode}
    }
}

export const createAccount = (account) => {
    return (dispatch) => {
        return axios.post(`${apiUrl}/account/create`, event)
            .then(response => {
                dispatch(createAccountSuccess(response.data))
                dispatch(setActiveLanguage(response.data.language))
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
                dispatch(setActiveLanguage(response.data.language))
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
        return axios.get(`${apiUrl}/account/email/${email}`)
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
        return axios.get(`${apiUrl}/account/id/${id}`)
            .then(response => {
                if(response.status == 204){
                    dispatch(fetchAccountSuccess(null))
                    history.push('/login')
                }else{
                    dispatch(fetchAccountSuccess(response.data))
                    history.push('/events')
                }
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const fetchAccount = account => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/account/id/${account._id}`)
            .then(response => {
                if(response.status == 204){
                    dispatch(fetchAccountSuccess(null))
                    history.push('/login')
                }else{
                    if(response.data.email != account.email){
                        dispatch(fetchAccountSuccess(account))
                        history.push('/login')
                    }else {
                        dispatch(fetchAccountSuccess(response.data))

                        dispatch(setActiveLanguage(response.data.language))

                        history.push('/events')
                    }
                }
            })
            .catch(error => {
                throw(error);
            });
    };
};