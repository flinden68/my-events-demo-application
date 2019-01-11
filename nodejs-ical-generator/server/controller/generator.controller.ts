import { Request, Response } from 'express';
import {Payload} from "../model/payload";
import {Event} from "../model/event"
import moment = require("moment");
const ical = require('ical-generator');


export class GeneratorController {

    constructor() {
        this.init();
    }

    init(){

    }

    generateIcal(req: Request, res: Response): any{
        const payload = new Payload( req.body.organizer);

        for (var i = 0; i < req.body.events.length; i++) {
            payload.addEvent(new Event(null, req.body.events[i].title, req.body.events[i].description, req.body.events[i].start, req.body.events[i].end, req.body.events[i].userId));
        }

        const cal = ical();

        for (var event of payload.getEvents()) {
            cal.createEvent({
                start: event.getStart(),
                end: event.getEnd(),
                timestamp: moment(),
                summary: event.getTitle(),
                description: event.getDescription(),
                organizer: payload.getOrganizer()
            })
            //cal.createEvent(event.toIcalEvent());
        }

        return cal;
    }
}

