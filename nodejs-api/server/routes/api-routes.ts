import { Router, Request, Response } from 'express';
import {EventController} from "../controller/event.controller";
import {Event} from "../model/event";

const router: Router = Router();

const eventController = new EventController();
router.use(function timeLog (req, res, next) {
    next()
})

router.post('/event/test/create', (req: Request, res: Response) => {
    eventController.create(req,res).then(function(result) {
        res.redirect('/');
    });
});

router.post('/event/create', (req: Request, res: Response) => {
    eventController.create(req,res).then(function(result) {
        res.send(result);
    });
});

router.put('/event/update', (req: Request, res: Response) => {
    eventController.update(req,res).then(function(result) {
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
        res.send('UserId could not be found');
    }
});

router.get('/event/:eventId', (req: Request, res: Response) => {
    const eventId = req.params.eventId;
    if (eventId.trim()) {
        eventController.findOne(eventId).then(function(result) {
            res.send(result);
        });
    } else {
        res.send('UserId could not be found');
    }
});

router.get('/events', (req: Request, res: Response) => {
    eventController.find().then(function(result) {
        res.send(result);
    });

});

router.get('/events/:userId', (req: Request, res: Response) => {
    const userId = req.params.userId;
    if (userId.trim()) {
        eventController.findByUserId(userId).then(function(result) {
            res.send(result);
        });
    } else {
        res.send('UserId could not be found');
    }
});

export const ApiRoutes: Router = router;