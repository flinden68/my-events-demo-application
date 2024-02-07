import React from 'react';
import {createEvent} from "../../service/events";
import "react-datepicker/dist/react-datepicker.css";
import EventForm from "./EventForm";
import {Translate} from "react-localize-redux";
import {useNavigate} from "react-router";

const AddEvent = () => {
    const navigate = useNavigate();
    const addEvent = (event) => {
        createEvent(event)
            .then(() => {
                navigate('/events');
            })
            .catch((e) => {
                console.log('event not Saved: ' + e);
            });
    }

    return (
            <div>
                <h2><Translate id="title-add-event"></Translate></h2>
                <EventForm
                    onSubmitEvent={(event) => {
                        addEvent(event);
                    }}
                />
            </div>
        )
}

export default (AddEvent);
