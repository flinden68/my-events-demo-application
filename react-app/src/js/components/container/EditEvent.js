import React, {useEffect, useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import EventForm from "./EventForm";
import {Translate} from "react-localize-redux";
import {useNavigate, useParams} from "react-router";
import {fetchEvent, updateEvent} from "../../service/events";

const EditEvent  = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const update = (eventUpdate) => {
        updateEvent(id, eventUpdate)
            .then(() => {
                navigate('/events');
            })
            .catch((e) => {
                console.log('event not Saved: ' + e);
            });
    }

    const fetch = () => {
        fetchEvent(id, event)
            .then((response) => {
                setEvent(response)
            })
            .catch((e) => {
                console.log('event not fetched: ' + e);
            });
    }

    useEffect(() => {
        fetch()
    }, []);

    return (
            <div>
                <h2><Translate id="title-edit-event"></Translate></h2>
                {event && <EventForm
                    event = {event}
                    onSubmitEvent={(eventUpdate) => {
                        update(eventUpdate);
                    }}
                />}
            </div>
        );
}

export default EditEvent;
