import React from 'react';
import connect from "react-redux/es/connect/connect";
import {createEvent, updateEvent} from "../../actions/events";
import "react-datepicker/dist/react-datepicker.css";
import EventForm from "./EventForm";

const mapDispatchToProps = dispatch => {
    return {
        updateEvent: (id, event) => dispatch(updateEvent(id, event)),
    };
};

const mapStateToProps = (state, props) => {
    return {
        event: state.events.find((event) =>
            event._id === props.match.params.id)
    };
};

class EditEvent extends React.Component {
    constructor(props) {
        super(props);

        this.id = props.match.params.id;
    }

    render() {
        return (
            <EventForm
                event = {this.props.event}
                onSubmitEvent={(event) => {
                    console.log("edit submit: " + event)
                    this.props.updateEvent(this.id, event);
                }}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);