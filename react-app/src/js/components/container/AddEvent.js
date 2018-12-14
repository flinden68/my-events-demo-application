import React from 'react';
import connect from "react-redux/es/connect/connect";
import {createEvent} from "../../actions/events";
import "react-datepicker/dist/react-datepicker.css";
import EventForm from "./EventForm";
import { Translate } from "react-localize-redux";

const mapStateToProps = state => {
    return {
        account: state.account
    };
};

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
            <div>
                <h2><Translate id="title-add-event"></Translate></h2>
                <EventForm
                    onSubmitEvent={(event) => {
                        this.props.addEvent(event);
                    }}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);