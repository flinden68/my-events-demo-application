import React from 'react';
import connect from "react-redux/es/connect/connect";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom'

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
            userId: props.event ? props.event.userId : "",
            created: props.event ? props.event.created : new Date(),
            modified: props.event ? props.event.modified : new Date(),

            error: ''

        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeUserId = this.handleChangeUserId.bind(this);
    }

    handleChangeTitle(e) {
        this.setState({ title: e.target.value });
    }

    handleChangeUserId(e) {
        this.setState({ userId: e.target.value });
    }

    handleChangeDescription(e) {
        this.setState({ description: e.target.value });
    }

    handleChangeStartDate(date) {
        this.setState({ startInput: date });
    }

    handleChangeEndDate(date) {
        this.setState({ endInput: date });
    }

    onSubmit(e){

        e.preventDefault();

        if (!this.state.title) {
            this.setState(() => ({ error: 'Please set title!' }));
        } else {
            this.setState(() => ({ error: '' }));

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
            {this.state.error && <p className='error'>{this.state.error}</p>}
            <form onSubmit={this.onSubmit}>
                <h2>Add a new event</h2>
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
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        className="form-control"
                        type="text"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleChangeTitle}
                    />
                </div>
                <div className="form-group">
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