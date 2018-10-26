import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addEvent } from "../../actions/index";
import Input from "../presentational/Input";
const mapDispatchToProps = dispatch => {
    return {
        addEvent: event => dispatch(addEvent(event))
    };
};
class EventForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            start_date: "",
            end_date: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        //console.log(event.target.id +"-"+ event.target.value)
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { title } = this.state;
        const { start_date } = this.state;
        const { end_date } = this.state;
        const id = uuidv1();

        console.log(title +"-"+ start_date +"-"+ end_date +"-"+ id)
        this.props.addEvent({ title, start_date, end_date, id }); // Relevant Redux part!!

        this.setState({ title: "" });
        this.setState({ start_date: "" });
        this.setState({ end_date: "" });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Input
                    text="Title"
                    label="event_title"
                    type="text"
                    id="title"
                    value={this.state.title}
                    handleChange={this.handleChange}
                />

                <Input
                    text="Start date"
                    label="start_date"
                    type="date"
                    id="start_date"
                    value={this.state.start_date}
                    handleChange={this.handleChange}
                />

                <Input
                    text="End date"
                    label="end_date"
                    type="date"
                    id="end_date"
                    value={this.state.end_date}
                    handleChange={this.handleChange}
                />
                <button type="submit" className="btn btn-success btn-lg">
                    SAVE
                </button>
            </form>
        );
    }
}
const EventContainer = connect(null, mapDispatchToProps)(EventForm);
export default EventContainer;