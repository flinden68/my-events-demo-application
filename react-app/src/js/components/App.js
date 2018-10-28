import React from "react";
import EventList from "./container/EventList";
import AddEvent from "./container/AddEvent";
const App = () => (
    <div className="row">
        <div className="col-md-12">
            <h2>Events</h2>
            <EventList />
        </div>
        <div className="col-md-12">
            <h2>Add a new event</h2>
            <AddEvent />
        </div>
    </div>
);
export default App;