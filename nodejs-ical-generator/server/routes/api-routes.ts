import { Router, Request, Response } from 'express';
import {GeneratorController} from "../controller/generator.controller";
//import {AccountController} from "../controller/account.controller";

const router: Router = Router();

const generatorController = new GeneratorController();

router.use(function timeLog (req, res, next) {
    next()
})

router.post('/generate', (req: Request, res: Response) => {
    const cal = generatorController.generateIcal(req,res);

    cal.serve(res);
});

export const ApiRoutes: Router = router;