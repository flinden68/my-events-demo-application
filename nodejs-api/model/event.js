"use strict";

class Event {

    constructor(id, title, description) {
        // always initialize all instance properties
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.id = id;
        this.start_date;
        this.end_date;
        this.created;
        this.modified = new Date();
    }

    set start_date(String start) {
        this.start_date = new Date(start);
    }

}