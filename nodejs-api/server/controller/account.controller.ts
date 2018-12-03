import { MongoClient} from 'mongodb';
import { Request, Response } from 'express';
import {EventRepository} from "../repository/EventRepository";
import {Event} from "../model/event";
import {AccountRepository} from "../repository/AccountRepository";
import {Account} from "../model/account";
let pkg = require(__dirname + '/../../package.json');

const mongoUrl = 'mongodb://localhost:27017/';
const mongoUrlAtlas = 'mongodb://fa_events:ThHch9gn4RTXdZf@events-store-shard-00-00-e0aps.mongodb.net:27017,events-store-shard-00-01-e0aps.mongodb.net:27017,events-store-shard-00-02-e0aps.mongodb.net:27017/test?ssl=true&replicaSet=events-store-shard-0&authSource=admin&retryWrites=true'
const dbName = 'events-store';

export class AccountController {
    private db: any;
    private repository: AccountRepository;

    constructor() {
        this.init();
    }

    init(){
        MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
            if (err) return console.log(err)
            this.db = client.db(dbName) // whatever your database name is
            this.repository = new AccountRepository(this.db, 'account');
        })
    }

    async create(req: Request, res: Response):Promise<Account> {
        const account = new Account(req.body._id, req.body.email);
        account.setCreated(new Date());
        account.updateModified();
        return this.repository.create(account);
    }

    async update(req: Request, res: Response, id: string):Promise<Account> {
        const account = new Account(req.body._id, req.body.email);
        account.setCreated(req.body.created);
        account.updateModified();
        return this.repository.update(id, account);
    }

    async delete(id: string):Promise<boolean> {
        return this.repository.delete(id);
    }

    async findByEMail(email: string):Promise<Account> {
        return this.repository.findByEmail(email);
    }

    async findOne(id: string):Promise<Account> {
        return this.repository.findOne(id);
    }

    async find():Promise<Account[]> {
        return this.repository.find();
    }
}

