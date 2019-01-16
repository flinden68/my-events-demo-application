import React, { Component } from "react";
import { connect } from "react-redux";
import {deleteEvent, fetchaAllEventsByUserId, fetchAllEvents} from "../../actions/events";
import { Link } from 'react-router-dom'
import { Translate } from "react-localize-redux";
import {createIcal} from "../../service/calendar";
import saveAs from 'file-saver';

const mapStateToProps = state => {
    return {
        events: state.events,
        account: state.account
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteEvent: event => dispatch(deleteEvent(event)),
        fetchAllEvents: () => dispatch(fetchAllEvents()),
        fetchEventsById: (id) => dispatch(fetchaAllEventsByUserId(id)),
    };
};
class EventList extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: props.account ? props.account.name : "",
            email: props.account ? props.account.email : "",
        }
        this.deleteEvent = this.deleteEvent.bind(this);
        this.exportEvents = this.exportEvents.bind(this);
        //this.props.fetchAllEvents();
    }

    componentWillMount(){
        //console.log('account:' + JSON.stringify(this.props.account))
        this.props.fetchEventsById(this.props.account._id);
    }

    deleteEvent(e, event){
        e.preventDefault();
        this.props.deleteEvent(event);
    }

    getDomain(){
        let domain = this.state.email.substring(this.state.email.indexOf("@") + 1, this.state.email.length);
        return domain;
    }

    getTimezone(){
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return timezone;
    }

    exportEvents(e){
        e.preventDefault();

        let payload = {
            organizer: this.state.name + " <" + this.state.email + ">",
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

    render() {
        return (
            <div>
                <h2><Translate id="title-my-events"></Translate></h2>
                <div id="no-events" style={{display: (this.props.events.length > 0) ? 'none' : 'block' }}  className='alert alert-info'>
                    <Translate id="message-no-eventsr"></Translate>
                </div>
                <div id="export-events" className="button-row1" style={{display: (this.props.events.length > 0) ? 'block' : 'none' }}>
                    <button type="submit" className="btn btn-success float-right" onClick={(e) => this.exportEvents(e)}>
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
                    {this.props.events.map(event => (
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
                                <button type="submit" className="btn btn-danger" onClick={(e) => this.deleteEvent(e, event)}>
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
}
export default connect(mapStateToProps, mapDispatchToProps)(EventList);