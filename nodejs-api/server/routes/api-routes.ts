 import { Router, Request, Response } from 'express';
import {EventController} from "../controller/event.controller";
import {AccountController} from "../controller/account.controller";

const router: Router = Router();

const eventController = new EventController();
const accountController = new AccountController();
router.use(function timeLog (req, res, next) {
    next()
})

router.post('/event/create', (req: Request, res: Response) => {
    eventController.create(req,res).then(function(result) {
        res.send(result);
    });
});

router.put('/event/update/:eventId', (req: Request, res: Response) => {
    const eventId = req.params.eventId;
    eventController.update(req,res,eventId).then(function(result) {
        res.send(result);
    });
});

router.delete('/event/delete/:eventId', (req: Request, res: Response) => {
    const eventId = req.params.eventId;
    if (eventId.trim()) {
        eventController.delete(eventId).then(function(result) {
            res.send(result);
        });
    } else {
        res.send('Event could not be found');
    }
});

router.get('/event/:eventId', (req: Request, res: Response) => {
    const eventId = req.params.eventId;
    if (eventId.trim()) {
        eventController.findById(eventId).then(function(result) {
            res.send(result);
        });
    } else {
        res.send('Event could not be found');
    }
});

router.get('/events', (req: Request, res: Response) => {
    eventController.find({}).then(function(result) {
        res.send(result);
    });

});

router.get('/events/:userId', (req: Request, res: Response) => {
    const userId = req.params.userId;
    if (userId.trim()) {
        eventController.find({userId: userId}).then(function(result) {
            res.send(result);
        });
    } else {
        res.send('Event could not be found');
    }
});

//Account routes
router.post('/account/create', (req: Request, res: Response) => {
    accountController.create(req,res).then(function(result) {
        res.send(result);
    });
});

router.put('/account/update/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    accountController.update(req,res,id).then(function(result) {
        res.send(result);
    });
});

router.delete('/account/delete/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    if (id.trim()) {
        accountController.delete(id).then(function(result) {
            res.send(result);
        });
    } else {
        res.send('UserId could not be found');
    }
});

router.get('/account/email/:email', (req: Request, res: Response) => {
    const email = req.params.email;
    if (email.trim()) {
        accountController.find({email: email}).then(function(result) {
            if(result == null){
                res.status(204).send(result);
            }else {
                res.status(200).send(result);
            }
        });
    } else {
        res.send('Email could not be found');
    }
});

router.get('/account/id/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    if (id.trim()) {
        accountController.findById(id).then(function(result) {
            if(result == null){

                res.status(204).send(result);
            }else {
                res.status(200).send(result);
            }
        });
    } else {
        res.send('account id could not be found');
    }
});

router.get('/accounts', (req: Request, res: Response) => {
    accountController.find({}).then(function(result) {
        res.send(result);
    });

});

export const ApiRoutes: Router = router;
