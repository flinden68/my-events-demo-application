import Event from "../model/event";
import { Request, Response } from 'express';
import {Document} from "mongoose";
import Account from "../model/account";

export class EventController {

    async create(req: Request, res: Response):Promise<Document> {
        const event = await Event.create({
            title: req.body.title,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            userId: req.body.userId,
            location: req.body.location,
            created: new Date(),
            modified: new Date()
        });
        return event.save();
    }

    async update(req: Request, res: Response, eventId: string):Promise<Document> {
        return Event.findByIdAndUpdate(eventId, {
            title: req.body.title,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            userId: req.body.userId,
            location: req.body.location,
            modified: new Date()
        });
    }

    async delete(eventId: string) {
        Event.deleteOne({id: eventId});
    }

    async find(filter: any):Promise<Document[]> {
        return Event.find(filter);
    }
}

