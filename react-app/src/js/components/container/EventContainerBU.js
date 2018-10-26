import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";

class EventContainerBU extends Component {
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
        //console.log(event.target.id + " - " + event.target.value);
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
       // const data = new FormData(event.target);

        //console.log("Form data: " + JSON.stringify(data));

        /*fetch('/api/form-submit-url', {
            method: 'POST',
            body: data,
        });*/
    }

    render() {
        return (
            <form id="event-form" onSubmit={this.handleSubmit}>
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
                <button>Send data!</button>
            </form>
        );
    }
}
export default EventContainerBU;

const wrapper = document.getElementById("event-form");
wrapper ? ReactDOM.render(<EventContainerBU />, wrapper) : false;