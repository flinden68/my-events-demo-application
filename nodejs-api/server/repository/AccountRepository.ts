import { BaseRepository } from "./base/BaseRepository";
import {Account} from "../model/account";

export class AccountRepository extends BaseRepository<Account>{
    async findByEmail(email: string): Promise<Account> {
        return await this._collection.findOne({ "email": email});
    }

}