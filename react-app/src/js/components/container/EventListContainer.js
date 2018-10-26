import React from "react";
import { connect } from "react-redux";
const mapStateToProps = state => {
    return { events: state.events };
};
const EventList = ({ events }) => (
    <table className="table">
        <thead>
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Start date</th>
            <th scope="col">End date</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        {events.map(event => (
            <tr scope="row" key={event.id}>
                <td>{event.title}</td>
                <td>{new Intl.DateTimeFormat('nl-NL').format(new Date(event.start_date))}</td>
                <td>{new Intl.DateTimeFormat('nl-NL').format(new Date(event.end_date))}</td>
                <td></td>
            </tr>
        ))}
        </tbody>
    </table>

);
const EventListContainer = connect(mapStateToProps)(EventList);
export default EventListContainer;