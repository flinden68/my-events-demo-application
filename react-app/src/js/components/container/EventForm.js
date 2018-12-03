import React from 'react';
import connect from "react-redux/es/connect/connect";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import '../presentation/form.css';
import {FormErrors} from "../presentation/FormErrors";

const labelStyle = {
    marginRight: '10px'
};

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.event ? props.event.title : "",
            description: props.event ? props.event.description : "",
            startInput: props.event ? moment(props.event.start) : moment(),
            endInput: props.event ? moment(props.event.end) : moment(),
            userId: props.event ? props.event.userId : props.account._id,
            created: props.event ? props.event.created : new Date(),
            modified: props.event ? props.event.modified : new Date(),

            formErrors: {title: '', description: ''},
            titleValid: true,
            descriptionValid: true,
            formValid: true

        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeUserId = this.handleChangeUserId.bind(this);
    }

    handleChangeTitle(e) {
        const value = e.target.value;
        //console.log('title-' + value);
        this.setState({ title: value });
    }

    handleChangeUserId(e) {
        this.setState({ userId: e.target.value });
    }

    handleChangeDescription(e) {
        const value = e.target.value;
        //console.log('description-' + value);
        this.setState({ description: value });
    }

    handleChangeStartDate(date) {
        this.setState({ startInput: date });
    }

    handleChangeEndDate(date) {
        this.setState({ endInput: date });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let descriptionValid = this.state.descriptionValid;

        switch(fieldName) {
            case 'title':
                titleValid = value.length > 0;
                fieldValidationErrors.title = titleValid ? '': ' is required';
                break;
            case 'description':
                descriptionValid = value.length > 0;
                fieldValidationErrors.description = descriptionValid ? '': ' is required';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            titleValid: titleValid,
            descriptionValid: descriptionValid
        }, this.validateForm);
    }

    validateForm() {
        //console.log('this.state.titleValid: ' + this.state.titleValid);
        //console.log('this.state.descriptionValid: ' + this.state.descriptionValid)
        this.setState({formValid: this.state.titleValid && this.state.descriptionValid});
        //console.log('validForm: ' + this.state.formValid)
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    onSubmit(e){

        e.preventDefault();

        this.validateField('title', this.state.title);
        this.validateField('description', this.state.description);
        if(this.state.formValid){

            let event = {
                title: this.state.title,
                description: this.state.description,
                start: new Date(this.state.startInput).getTime(),
                end: new Date(this.state.endInput).getTime(),
                userId: this.state.userId,
                created: this.state.created,
                modified: this.state.modified,
                _class: "nl.elstarit.event.service.model.Event"
            }

            this.props.onSubmitEvent(event);
        }

    }

    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit}>
                <h2>Add a new event</h2>
                { !this.state.formValid ? <FormErrors formErrors={this.state.formErrors} /> : "" }
                <div className="form-group">
                    <label>User ID</label>
                    <input
                        className="form-control"
                        type="text"
                        id="userId"
                        value={this.state.userId}
                        onChange={this.handleChangeUserId}
                    />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.title)}`}>
                    <label htmlFor="title">Title</label>
                    <input
                        className="form-control"
                        type="text"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleChangeTitle}
                    />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.description)}`}>
                    <label htmlFor="description">Description</label>
                    <input
                        className="form-control"
                        type="textarea"
                        id="description"
                        value={this.state.description}
                        onChange={this.handleChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-6">
                            <label style={labelStyle}>
                                Start date
                            </label>
                            <DatePicker
                                id="start_date"
                                className="form-control"
                                selected={this.state.startInput}
                                onChange={this.handleChangeStartDate}
                                dateFormat="DD-MM-YYYY"
                            />
                        </div>
                        <div className="col-6">
                            <label style={labelStyle}>
                                End date
                            </label>
                            <DatePicker
                                id="end_date"
                                className="form-control"
                                selected={this.state.endInput}
                                onChange={this.handleChangeEndDate}
                                dateFormat="DD-MM-YYYY"
                            />
                        </div>
                    </div>
                </div>
                <Link to='/events' className='btn btn-primary'>Back</Link>
                <button type="submit" className="btn btn-success float-right">
                    Save
                </button>
            </form>
            </div>
        );
    }
}

export default connect()(EventForm);