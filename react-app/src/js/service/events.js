import {apiUrl} from "../constants/application"
import axios from 'axios';

//const apiUrl = 'http://localhost:3535/api';
export const fetchAllEventsByUserId = (userId) => {
    return axios.get(`${apiUrl}/events/${userId}`)
        .then(response => {
            return response.data;
        });
};

export const createEvent = (event) => {
    return axios.post(`${apiUrl}/event/create`, event)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw(error);
        });
};

export const fetchEvent = (eventId) => {
    return axios.get(`${apiUrl}/event/${eventId}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw(error);
        });
};

export const updateEvent = (id, event) => {
    return axios.put(`${apiUrl}/event/update/${id}`, event)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw(error);
        });
};

export const deleteEvent = eventId => {
    return new Promise(async (resolve, reject) => {
        console.log("Delete......", eventId);
        return axios.delete(`${apiUrl}/event/delete/${eventId}`)
            .then(response => {
                console.log("Delete successful");
                resolve()
            })
            .catch(error => {
                reject()
            });
    });
};
