import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addEvent } from "../../actions/index";s
const mapDispatchToProps = dispatch => {
    return {
        addEvent: event => dispatch(addEvent(event))
    };
};
class EventContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            start_date: "",
            end_date: "",
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
        const { title } = this.state;
        const { start_date } = this.state;
        const { end_date } = this.state;
        const { description } = this.state;
        const id = uuidv1();

        this.props.addEvent({ title, description, start_date, end_date, id }); // Relevant Redux part!!

        this.props.onSubmitEvent(
            {
                title: this.state.title,
                author: this.state.author,
                description: this.state.description,
                published: this.state.published
            }
        );

        this.setState({ title: "" });
        this.setState({ start_date: "" });
        this.setState({ end_date: "" });
        this.setState({description: ""});
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
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
                        id="start_date"
                        value={this.state.start_date}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="end_date">End date</label>
                    <input
                        className="form-control"
                        type="date"
                        id="end_date"
                        value={this.state.end_date}
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
//const EventContainer = connect(null, mapDispatchToProps)(EventForm);
//export default EventContainer;

export default connect(null, mapDispatchToProps)(EventContainer);