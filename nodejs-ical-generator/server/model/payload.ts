import {Event} from "./event";

export class Payload {
    private organizer: string;
    private domain : string;
    private timezone: string;
    private events: Event[] = [];

    constructor(organizer: string, domain: string, timezone: string) {
        this.organizer = organizer;
        this.domain = domain;
        this.timezone = timezone;
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

    getDomain(){
        return this.domain;
    }

    getTimezone(){
        return this.timezone;
    }
}