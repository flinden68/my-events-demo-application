import { Router, Request, Response } from 'express';
import {GeneratorController} from "../controller/generator.controller";
//import {AccountController} from "../controller/account.controller";

const router: Router = Router();

const generatorController = new GeneratorController();

router.use(function timeLog (req, res, next) {
    next()
})

router.post('/generate-ical', (req: Request, res: Response) => {
    generatorController.generateIcal(req,res).then(function(result) {
        res.send(result);
    });
});

export const ApiRoutes: Router = router;