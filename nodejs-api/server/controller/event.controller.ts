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
        try {
            return Event.findByIdAndUpdate(eventId, {
                title: req.body.title,
                description: req.body.description,
                start: req.body.start,
                end: req.body.end,
                userId: req.body.userId,
                location: req.body.location,
                modified: new Date()
            });
        } catch(err) {
            console.log(err)
        }
    }

    async delete(eventId: string) {
        try {
            const result = await Event.findByIdAndDelete(eventId)
            console.log("Deleted event: ", result);
        } catch(err) {
            console.log(err)
        }
    }

    async find(filter: any):Promise<Document[]> {
        return Event.find(filter);
    }

    async findById(id: any):Promise<Document[]> {
        return Event.findById(id);
    }
}

