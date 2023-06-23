import {Request, Response} from 'express';
import Account from "../model/account";
import {Document} from "mongoose";

export class AccountController {

    async create(req: Request, res: Response):Promise<Document> {
        const account = await Account.create({
            email: req.body.email,
            language: req.body.language,
            name: req.body.name,
            created: new Date(),
            modified: new Date()
        });
        return account.save();
    }

    async update(req: Request, res: Response, id: string):Promise<Document> {
        return Account.findByIdAndUpdate(id, {
            email: req.body.email,
            language: req.body.language,
            name: req.body.name,
            modified: new Date()
        });
    }

    async delete(id: string) {
        Account.deleteOne({id: id});
    }

    async find(filter: any):Promise<Document[]> {
        return Account.find(filter);
    }
}

