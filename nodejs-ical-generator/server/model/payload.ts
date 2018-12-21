import {Event} from "./event";

export class Payload {
    private email: string;
    private events: Event[];

    constructor(email: string, events: Event[]) {
        this.email = email;
        this.events = events;
    }
}