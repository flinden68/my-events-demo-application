import React from 'react';
import EventForm from './EventForm';
import { connect } from 'react-redux';
import { addEvent } from '../../actions';

const AddEvent = (props) => (
    <div>
        <h3>Set Event information:</h3>
        <EventForm
            onSubmitEvent={(event) => {
                props.dispatch(addEvent(event));
                //props.history.push('/');
            }}
        />
    </div>
);

export default connect()(AddEvent);