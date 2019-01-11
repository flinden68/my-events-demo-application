import axios from "axios";
import {apiIcalUrl} from "../constants/application";
//const apiUrl = 'http://localhost:4040/api';


export const createIcal = (events) => {
    return axios.post(`${apiIcalUrl}/generate`, events)
            .then(response => {
                //console.log("Ical Response = " + JSON.stringify(response));
                return response;
            })
            .catch(error => {
                throw(error);
            });
};

