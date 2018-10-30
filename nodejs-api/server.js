let express = require('express');
let bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Connection URL
const mongoUrl = 'mongodb://localhost:27017/';
const dbName = 'events-store';
var port = process.env.PORT || 3030;

var db;

MongoClient.connect(mongoUrl, (err, client) => {
    if (err) return console.log(err)
    db = client.db(dbName) // whatever your database name is
    app.listen(port, () => {
        console.log("Running Event Service API on port " + port);
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/api/event/create', (req, res) => {
    console.log(req.body);
    console.log(req.body.start_date);
        /*db.collection('event').insertOne(req.body, (err, result) => {
            if (err) return console.log(err);

            console.log('saved to database');
            res.redirect('/');
        })*/
});

app.get('/api/events', (req, res) => {
    db.collection('event').find().toArray(function(err, results) {
        console.log(results)
        res.send(results);
    })
});

/*app.listen(port, function () {
    console.log("Running Event Service API on port " + port);
});*/

