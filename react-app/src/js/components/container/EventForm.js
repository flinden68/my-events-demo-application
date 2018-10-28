import React from 'react';

export default class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: props.event ? props.event.title : '',
            description: props.event ? props.event.description : '',
            start_date: props.event ? props.event.start_date : '',
            end_date: props.event ? props.event.end_date : '',
            error: ''
        };
    }

    onTitleChange(e) {
        const title = e.target.value;
        this.setState(() => ({ title: title }));
    }

    onDescriptionChange(e) {
        const description = e.target.value;
        this.setState(() => ({ description: description }));
    }

    onStartDateChange(e) {
        const start_date = e.target.value;
        this.setState(() => ({ start_date: start_date }));
    }

    onEndDateChange(e) {
        const end_date = e.target.value;
        this.setState(() => ({ end_date: end_date }));
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.title) {
            this.setState(() => ({ error: 'Please set title!' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmitEvent(
                {
                    title: this.state.title,
                    description: this.state.description,
                    start_date: this.state.start_date,
                    end_date: this.state.end_date
                }
            );
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p className='error'>{this.state.error}</p>}
                <form onSubmit={this.onSubmit} className='add-book-form'>

                    <input type="text" placeholder="title" autoFocus
                           value={this.state.title}
                           onChange={this.onTitleChange} />
                    <br />

                    <textarea placeholder="description"
                              value={this.state.description}
                              onChange={this.onDescriptionChange} />
                    <br />

                    <input type="date" placeholder="start_date"
                           value={this.state.start_date}
                           onChange={this.onStartDateChange}
                    />
                    <br />

                    <input type="date" placeholder="end_date"
                           value={this.state.end_date}
                           onChange={this.onEndDateChange}
                    />
                    <br />
                    <button>Add Book</button>
                </form>
            </div>
        );
    }
}