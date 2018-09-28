import * as React from 'react';

interface EventProps{
    eventName: string;
}

export class Event extends React.Component<EventProps> {

    //private start: Date = new Date();
    //private name:string = '';

    handleSubmit(event) {
        alert('A name was submitted: ' + this.props.eventName);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.props.eventName} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}