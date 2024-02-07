import axios from "axios";
import {apiIcalUrl} from "../constants/application";

export const createIcal = (events) => {
    return axios.post(`${apiIcalUrl}/generate`, events)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw(error);
            });
};

