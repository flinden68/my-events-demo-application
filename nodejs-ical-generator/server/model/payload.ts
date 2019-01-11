import {Event} from "./event";

export class Payload {
    private organizer: string;
    private events: Event[] = [];

    constructor(organizer: string) {
        this.organizer = organizer;
    }

    addEvent(event : Event){
        this.events.push(event);
    }

    getEvents(): Event[]{
        return this.events;
    }

    getOrganizer(){
        return this.organizer;
    }
}