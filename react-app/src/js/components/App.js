import React from "react";
import EventListContainer from "./container/EventListContainer";
import EventContainer from "./container/EventContainer";
const App = () => (
    <div className="row">
        <div className="col-md-12">
            <h2>Events</h2>
            <EventListContainer />
        </div>
        <div className="col-md-12">
            <h2>Add a new event</h2>
            <EventContainer />
        </div>
    </div>
);
export default App;