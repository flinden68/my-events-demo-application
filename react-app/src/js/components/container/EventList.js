import React, { Component } from "react";
import { connect } from "react-redux";
import {deleteEvent, fetchaAllEventsByUserId, fetchAllEvents} from "../../actions/events";
import { Link } from 'react-router-dom'
import { Translate } from "react-localize-redux";

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
        fetchEventsById: (id) => dispatch(fetchaAllEventsByUserId(id))
    };
};
class EventList extends Component {

    constructor(props){
        super(props);
        this.deleteEvent = this.deleteEvent.bind(this);
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

    render() {
        return (
            <div>
                <h2><Translate id="title-my-events"></Translate></h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col"><Translate id="column-title"></Translate></th>
                        <th scope="col"><Translate id="column-description"></Translate></th>
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
                            {/*<td>{event.start}</td>*/}
                            {/*<td>{event.end}</td>*/}
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