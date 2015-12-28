var bodyParser = require('body-parser');
var express  = require('express');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

mongoose.connect('mongodb://localhost:27017/recruiting');

require('./utilities/data-import')();

var app = express();

var https = require('https').createServer({
	key: fs.readFileSync('./key-recruiting.pem'),
	cert: fs.readFileSync('./cert-recruiting.pem')
}, app);

var io = require('socket.io')(https);

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
require('./controllers/languages')(router);

app.use('/', router);

require('./utilities/load-socket-data')(io);

https.listen(3000, function(){
	console.log('listening on *:3000');
});
