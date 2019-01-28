import {apiUrl} from "../constants/application";
import axios from 'axios';
//import history from "../history";
//import { setActiveLanguage } from "react-localize-redux";

export default {
    createAccount(account) {
        return axios.post(`${apiUrl}/account/create`, account)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw(error);
            });
    },

    updateAccount(id, account) {
        return axios.put(`${apiUrl}/account/update/${id}`, account)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw(error);
            });
    },

    deleteAccount(account) {
        return axios.delete(`${apiUrl}/account/delete/${account._id}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw(error);
            });
    },

    fetchAccountByEmail(email) {
        return axios.get(`${apiUrl}/account/email/${email}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw(error);
            });

    },


    fetchAccountById(id) {
        return axios.get(`${apiUrl}/account/id/${id}`)
            .then(response => {
                if (response.status == 204) {
                    //back to login
                    return response;
                } else {
                    return response;
                }
            })
            .catch(error => {
                throw(error);
            });
    },

    fetchAccount(account) {

        return axios.get(`${apiUrl}/account/id/${account._id}`)
            .then(response => {
                if (response.status == 204) {
                    return response;
                } else {
                    if (response.data.email != account.email) {
                        //back to login
                        return response;
                    } else {
                        return response;
                    }
                }
            })
            .catch(error => {
                throw(error);
            });

    }

}