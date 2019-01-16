import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as homeController from './controller/home.controller';
import {ApiRoutes} from "./routes/api-routes";

dotenv.config();

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

app.set('port', process.env.PORT || 3535);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', homeController.index);

app.use('/api', ApiRoutes);

app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'),
        app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

module.exports = app;