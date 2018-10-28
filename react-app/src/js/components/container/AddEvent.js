import React from 'react';
import uuidv1 from "uuid";
import connect from "react-redux/es/connect/connect";
import {addEvent} from "../../actions";

const mapDispatchToProps = dispatch => {
    return {
        addEvent: event => dispatch(addEvent(event))
    };
};

class EventForm extends React.Component {
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

        this.props.addEvent(
            {
                title: this.state.title,
                start_date: this.state.start_date,
                description: this.state.description,
                end_date: this.state.end_date,
                id: uuidv1()
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

export default connect(null, mapDispatchToProps)(EventForm);