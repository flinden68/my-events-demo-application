import React, { Component } from "react";
import { connect } from "react-redux";
import {deleteEvent, fetchAllEvents} from "../../actions";
const mapStateToProps = state => {
    return { events: state.events };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteEvent: event => dispatch(deleteEvent(event)),
        fetchAllEvents: () => dispatch(fetchAllEvents())
    };
};
class EventList extends Component {

    constructor(props){
        super(props);
        this.deleteEvent = this.deleteEvent.bind(this);
        //this.props.fetchAllEvents();
    }

    componentWillMount(){
        this.props.fetchAllEvents();
    }

    deleteEvent(e, event){
        e.preventDefault();

        console.log(event.title)
        this.props.deleteEvent(event);
    }

    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Start date</th>
                    <th scope="col">End date</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {this.props.events.map(event => (
                    <tr scope="row" key={event._id}>
                        <td>{event.title}</td>
                        {/*<td>{new Intl.DateTimeFormat('nl-NL').format(new Date(event.start_date))}</td>*/}
                        <td>{event.start}</td>
                        <td>{event.end}</td>
                        <td>
                            <button type="submit" className="btn btn-danger" onClick={(e) => this.deleteEvent(e, event)}>
                                delete
                            </button>
                        </td>
                        <td>
                            {event._id}
                            <br />
                            {event.userId}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventList);