var bodyParser = require('body-parser');
var express  = require('express');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost:27017/recruitingBlank');

require('./utilities/data-import')();

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended' : false}));

app.use('/', express.static(path.join(__dirname, '../frontend/')));
app.use('/documents', express.static(path.join(__dirname, '../documents/')));

var router = express.Router();

require('./controllers/base')(router);
require('./controllers/geodata')(router);
require('./controllers/majors')(router);
require('./controllers/recruits')(router, io);
require('./controllers/skills')(router);

app.use('/', router);

require('./utilities/load-socket-data')(io);

http.listen(3000, function(){
	console.log('listening on *:3000');
});
