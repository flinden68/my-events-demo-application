let express = require('express');
let bodyParser= require('body-parser');
const app = express();
var cors = require('cors');
const apiRoutes = require('./server/routes/api-routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3030;

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.use('/api', apiRoutes);

app.listen(port, function () {
    console.log("Running Event Service API on port " + port);
});

