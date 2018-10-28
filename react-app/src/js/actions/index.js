import { ADD_EVENT, DELETE_EVENT, GET_EVENTS } from "../constants/action-types";
export const addEvent = event => ({ type: ADD_EVENT, payload: event });
export const deleteEvent = event => ({ type: DELETE_EVENT, payload: event });

export const getEvents = events => ({ type: GET_EVENTS, payload: events });