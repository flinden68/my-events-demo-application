import {
    ADD_EVENT,
    DELETE_EVENT,
    GET_EVENT,
    GET_EVENTS,
    GET_EVENTS_BY_USER_ID,
    UPDATE_EVENT
} from "../constants/action-types";
import axios from 'axios';
import history from '../history';

const apiUrl = 'http://localhost:3030/api';

export const createEvent = (event) => {
    return (dispatch) => {
        return axios.post(`${apiUrl}/event/create`, event)
            .then(response => {
                dispatch(createEventSuccess(response.data))
                    history.push('/events')
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const createEventSuccess =  (data) => {
    return {
        type: ADD_EVENT,
        payload: data
    }
};

export const updateEvent = (id, event) => {
    return (dispatch) => {
        return axios.put(`${apiUrl}/event/update/${id}`, event)
            .then(response => {
                dispatch(updateEventSuccess(response.data))
                    history.push('/events')
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const updateEventSuccess =  (data) => {
    return {
        type: UPDATE_EVENT,
        payload: data
    }
};

export const deleteEventSuccess = event => {
    return {
        type: DELETE_EVENT,
        payload: event
    }
}

export const deleteEvent = event => {
    return (dispatch) => {
        return axios.delete(`${apiUrl}/event/delete/${event._id}`)
            .then(response => {
                dispatch(deleteEventSuccess(event))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const fetchEvents = (events) => {
    return {
        type: GET_EVENTS,
        payload: events
    }
};

export const fetchAllEvents = () => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/events`)
            .then(response => {
                dispatch(fetchEvents(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const fetchEventsByUserId = (events) => {
    return {
        type: GET_EVENTS_BY_USER_ID,
        payload: events
    }
};

export const fetchaAllEventsByUserId = userid => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/events/${userid}`)
            .then(response => {
                dispatch(fetchEventsByUserId(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const fetchEventById = (event) => {
    return {
        type: GET_EVENT,
        payload: event
    }
};

export const fetchaAllventsByUserId = id => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/event/${id}`)
            .then(response => {
                dispatch(fetchEventById(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};