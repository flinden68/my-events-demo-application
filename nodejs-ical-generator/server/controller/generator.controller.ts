import { Request, Response } from 'express';
import {Event} from "../model/event";
import {Payload} from "../model/payload";
let pkg = require(__dirname + '/../../package.json');


export class GeneratorController {

    constructor() {
        this.init();
    }

    init(){

    }

    async generateIcal(req: Request, res: Response){
        const payload = new Payload( req.body.email, req.body.events);

    }
}

