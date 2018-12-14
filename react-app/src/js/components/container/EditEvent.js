import React from 'react';
import connect from "react-redux/es/connect/connect";
import {updateEvent} from "../../actions/events";
import "react-datepicker/dist/react-datepicker.css";
import EventForm from "./EventForm";
import { Translate } from "react-localize-redux";

const mapDispatchToProps = dispatch => {
    return {
        updateEvent: (id, event) => dispatch(updateEvent(id, event)),
    };
};

const mapStateToProps = (state, props) => {
    return {
        account: state.account,
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
            <div>
                <h2><Translate id="title-edit-event"></Translate></h2>
                <EventForm
                    event = {this.props.event}
                    onSubmitEvent={(event) => {
                        this.props.updateEvent(this.id, event);
                    }}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);