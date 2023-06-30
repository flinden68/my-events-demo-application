import {apiUrl} from "@/constants/application"
import axios from 'axios';
//import history from '../history';

//const apiUrl = 'http://localhost:3535/api';

export default {
    createEvent(event) {
        return axios.post(`${apiUrl}/event/create`, event)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw(error);
            });
    },

    updateEvent(id, event) {
        return axios.put(`${apiUrl}/event/update/${id}`, event)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw(error);
            });

    },

    deleteEvent(event) {
        return axios.delete(`${apiUrl}/event/delete/${event._id}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw(error);
            });
    },


    fetchAllEvents() {
        return axios.get(`${apiUrl}/events`)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw(error);
            });
    },

    fetchAllEventsByUserId(userid) {
        return axios.get(`${apiUrl}/events/${userid}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw(error);
            });

    },

    fetchEventById(id) {
        return axios.get(`${apiUrl}/event/${id}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw(error);
            });
    },

}
