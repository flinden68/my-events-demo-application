let express = require('express');
const router = express.Router();
let bodyParser= require('body-parser');
let ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;




// Connection URL
const mongoUrl = 'mongodb://localhost:27017/';
const dbName = 'events-store';

var db;

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
    db = client.db(dbName) // whatever your database name is
})

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    //console.log('Time: ', Date.now())
    next()
})

router.post('/event/test/create', (req, res) => {
    db.collection('event').insertOne(
        {
            "title": req.body.title,
            "description": req.body.description,
            "start_date": new Date(req.body.start_date).getTime(),
            "end_date": new Date(req.body.end_date).getTime(),
            "userId": req.body.userId,
            "created": new Date(),
            "modified": new Date(),
            "_class": "nl.elstarit.event.service.model.Event"
        }, (err, result) => {
            if (err) return console.log(err);
            res.redirect('/');
        })
});

router.post('/event/create', (req, res) => {
    db.collection('event').insertOne(
        {
            "title": req.body.title,
            "description": req.body.description,
            "start_date": req.body.start_date,
            "end_date": req.body.end_date,
            "userId": req.body.userId,
            "created": new Date(),
            "modified": new Date(),
            "_class": "nl.elstarit.event.service.model.Event"
        }, (err, result) => {
            if (err) return console.log(err);

            res.send(result.ops[0]);
        })
});

router.put('/event/update', (req, res) => {
    db.collection('event')
        .findOneAndUpdate(
            { "_id": ObjectID(req.body._id)},
            {
                $set:
                    {
                        "title": req.body.title,
                        "description": req.body.description,
                        "start_date": req.body.start_date,
                        "end_date": req.body.end_date,
                        "userId": req.body.userId,
                        "modified": new Date()
                    }
            },
            {
                new: true,
                returnOriginal: false
            },
            function (err, documents) {
                if (err) return console.log(err);
                res.send(documents.value);
            });
});

router.delete('/event/delete/:eventId', (req, res) => {
    var eventId = req.params.eventId;
    console.log('deleting: ' + eventId);
    db.collection('event')
        .deleteOne(
            { "_id": ObjectID(eventId)}
            ,
            function (err, response) {
                if (err) return console.log(err);
                res.send(response);
            });
});

router.get('/event/:eventId', (req, res) => {
    var eventId = req.params.eventId;
    db.collection('event').findOne(
        { "_id": ObjectID(eventId)},
        function (err, response) {
            if (err) return console.log(err);
            res.send(response);
        });
});

router.get('/events', (req, res) => {
    db.collection('event').find().toArray(function(err, results) {
        res.send(results);
    })
});

module.exports = router;