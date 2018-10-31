import { BaseRepository } from "./base/BaseRepository";
import { Event } from "../model/Event";

export class EventRepository extends BaseRepository<Event>{
    async findByUserId(userId: string): Promise<Event[]> {
        return await this._collection.find({ "userId": userId}).toArray();
    }

}