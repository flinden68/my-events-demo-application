import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import {Translate} from "react-localize-redux";
import {createIcal} from "../../service/calendar";
import saveAs from 'file-saver';
import useAuth from "../../hooks/useAuth";
import {deleteEvent, fetchAllEventsByUserId} from "../../service/events";

const EventList = () => {
    const { account } = useAuth();
    const [events, setEvents] = useState([])
    const name = "";
    const email = "";

    useEffect(() => {
        reloadEvents()
    },[]);

    const dEvent = (e, eventId) =>{
        e.preventDefault();
        console.log("Delete event with Id: " + eventId)
        deleteEvent(eventId)
            .then((response) => {
                console.log("Delete successful");
                reloadEvents()
            }
         )
            .catch((e) => {
                console.log("Delete unsuccessful", e);
            })
    }

    const getDomain = () =>{
        return this.email.substring(email.indexOf("@") + 1, email.length);
    }

    const getTimezone = () =>{
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    const reloadEvents = () => {
        fetchAllEventsByUserId(account._id)
            .then((response) => {
                setEvents(response)
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const exportEvents = (e) =>{
        e.preventDefault();

        let payload = {
            organizer: name + " <" + email + ">",
            domain : this.getDomain(),
            timezone : this.getTimezone(),
            events: this.props.events
        }

        //console.log("Export payload = " + JSON.stringify(payload));
        createIcal(payload).then(response => {
            let blob = new Blob([response.data], {type: "text/calendar;charset=utf-8"});
            saveAs(blob, "calendar.ics");
            })
            .catch(error => {
                throw(error);
            });
    }

    return (
            <div>
                <h2><Translate id="title-my-events"></Translate></h2>
                <div id="no-events" style={{display: (events.length > 0) ? 'none' : 'block' }}  className='alert alert-info'>
                    <Translate id="message-no-events"></Translate>
                </div>
                <div id="export-events" className="button-row1" style={{display: (events.length > 0) ? 'block' : 'none' }}>
                    <button className="btn btn-primary float-left" onClick={(e) => reloadEvents()}>
                        <Translate id="button-refresh"></Translate>
                    </button>
                    <button type="submit" className="btn btn-success float-right" onClick={(e) => exportEvents(e)}>
                        <Translate id="button-export"></Translate>
                    </button>
                </div>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col"><Translate id="column-title"></Translate></th>
                        <th scope="col"><Translate id="column-description"></Translate></th>
                        <th scope="col"><Translate id="column-location"></Translate></th>
                        <th scope="col"><Translate id="column-start-date"></Translate></th>
                        <th scope="col"><Translate id="column-end-date"></Translate></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {events && events.map(event => (
                        <tr scope="row" key={event._id}>
                            <td>{event.title}</td>
                            <td>{event.description}</td>
                            <td>{event.location}</td>
                            <td>{new Intl.DateTimeFormat('nl-NL').format(new Date(event.start))}</td>
                            <td>{new Intl.DateTimeFormat('nl-NL').format(new Date(event.end))}</td>
                            <td>
                                <Link className="btn btn-warning" to={`/event/${event._id}`}>
                                    <Translate id="button-edit"></Translate>
                                </Link>
                            </td>
                            <td>
                                <button type="submit" className="btn btn-danger" onClick={(e) => dEvent(e, event._id)}>
                                    <Translate id="button-delete"></Translate>
                                </button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        )
}
export default EventList;
