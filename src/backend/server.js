var bodyParser = require('body-parser');
var express  = require('express');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost:27017/recruiting');

require('./utilities/data-import')();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended' : false}));

app.use('/', express.static(path.join(__dirname, '../frontend/')));
app.use('/documents', express.static(path.join(__dirname, '../documents/')));

var router = express.Router();

require('./controllers/base')(router);
require('./controllers/geodata')(router);
require('./controllers/majors')(router);
require('./controllers/recruits')(router);
require('./controllers/skills')(router);

app.use('/', router);

app.listen(3000);
console.log('Listening to PORT 3000');