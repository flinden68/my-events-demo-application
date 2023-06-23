import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as homeController from './controller/home.controller';
import {ApiRoutes} from "./routes/api-routes";
const cors = require('cors')

dotenv.config();

const app = express();
const mongoose = require("mongoose");

const whitelist = ['http://localhost:8080','http://localhost:8081','http://localhost:4200'];

const corsOptions = {
    origin: function (origin:any, callback:any) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));
app.set('port', process.env.PORT || 3536);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', homeController.index);

app.use('/api', ApiRoutes);

const mongoUrl = 'mongodb://localhost:27017/events-store';
mongoose.connect(mongoUrl,
    {
        useNewUrlParser: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected to Mongodb (" + mongoUrl + ") was successfully");
});

app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'),
        app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

module.exports = app;
