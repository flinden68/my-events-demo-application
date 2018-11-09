import React from 'react';
import connect from "react-redux/es/connect/connect";
import {createEvent} from "../../actions/events";
import "react-datepicker/dist/react-datepicker.css";
import EventForm from "./EventForm";


const mapDispatchToProps = dispatch => {
    return {
        addEvent: event => dispatch(createEvent(event)),
    };
};

class AddEvent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <EventForm
                onSubmitEvent={(event) => {
                    this.props.addEvent(event);
                }}
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(AddEvent);