import { MongoClient} from 'mongodb';
import { Request, Response } from 'express';
import {EventRepository} from "../repository/EventRepository";
import {Event} from "../model/event";
let pkg = require(__dirname + '/../../package.json');

const mongoUrl = 'mongodb://localhost:27017/';
const mongoUrlAtlas = 'mongodb://fa_events:ThHch9gn4RTXdZf@events-store-shard-00-00-e0aps.mongodb.net:27017,events-store-shard-00-01-e0aps.mongodb.net:27017,events-store-shard-00-02-e0aps.mongodb.net:27017/test?ssl=true&replicaSet=events-store-shard-0&authSource=admin&retryWrites=true'
const dbName = 'events-store';

export class EventController {
    private db: any;
    private repository: EventRepository;

    constructor() {
        this.init();
    }

    init(){
        MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
            if (err) return console.log(err)
            this.db = client.db(dbName) // whatever your database name is
            this.repository = new EventRepository(this.db, 'event');
        })
    }

    async create(req: Request, res: Response):Promise<Event> {
        const event = new Event(null, req.body.title, req.body.description, req.body.start, req.body.end, req.body.userId, req.body.location);
        event.setCreated(new Date);
        event.updateModified();
        return this.repository.create(event);
    }

    async update(req: Request, res: Response, eventId: string):Promise<Event> {
        const event = new Event(null, req.body.title, req.body.description, req.body.start, req.body.end, req.body.userId, req.body.location);
        event.setCreated(req.body.created);
        event.updateModified();
        return this.repository.update(eventId, event);
    }

    async delete(eventId: string):Promise<boolean> {
        return this.repository.delete(eventId);
    }

    async find():Promise<Event[]> {
        return this.repository.find();
    }

    async findByUserId(userId: string):Promise<Event[]> {
        return this.repository.findByUserId(userId);
    }

    async findOne(eventId: string):Promise<Event> {
        return this.repository.findOne(eventId);
    }
}

