import React from 'react';
import connect from "react-redux/es/connect/connect";
import {createEvent} from "../../actions";

const mapDispatchToProps = dispatch => {
    return {
        addEvent: event => dispatch(createEvent(event))
    };
};

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                title: "",
                description: "",
                start: "",
                end: "",
                userId: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        //console.log(e.target.id +"-"+ e.target.value)
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        let event = {
            title: this.state.title,
            description: this.state.description,
            start: new Date(this.state.start).getTime(),
            end: new Date(this.state.end).getTime(),
            userId: this.state.userId
        }

        console.log('event: ' + JSON.stringify(event));
        this.props.addEvent( event );

        this.setState({ title: "" });
        this.setState({ description: ""});
        this.setState({ start: "" });
        this.setState({ end: "" });
        this.setState({ userId: "" });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userid">User ID</label>
                    <input
                        className="form-control"
                        type="text"
                        id="userId"
                        value={this.state.userId}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        className="form-control"
                        type="text"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        className="form-control"
                        type="textarea"
                        id="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="start_date">Start date</label>
                    <input
                        className="form-control"
                        type="date"
                        id="start"
                        value={this.state.start}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="end_date">End date</label>
                    <input
                        className="form-control"
                        type="date"
                        id="end"
                        value={this.state.end}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    SAVE
                </button>
            </form>
        );
    }
}

export default connect(null, mapDispatchToProps)(EventForm);