var express  = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recruiting');

var bodyParser = require('body-parser');
var peopleModal = require('./models/people');
var skillsModel = require('./models/skills');
var path = require('path');

var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended' : false}));

app.use('/', express.static(path.join(__dirname, '../frontend/')));

var OBJ_ERROR = {'success': false, 'message': 'Unknown Error Occured'};

router.route('/')
	.get(
		function(req,res) {
			res.sendFile(path.join(__dirname, '../frontend/index.html'));
		}
	);

router.route('/api/recruits')
	.get(
		function(req, res) {
			var term = req.query['term'];

			if (!term) {
				term = '';
			}

			var regex = new RegExp('.*' + term + '.*', 'i');

			peopleModal.find(
				{fullName: regex},
				function(err,data) {
				var response = {};

				if (err) {
					response = OBJ_ERROR;
				}
				else {
					response = data;
				}
				res.json(response);
			}
		);
		}
	)
	.post(
		function(req,res) {
			var db = new peopleModal();

			var firstName = req.body.firstName;
			var lastName = req.body.lastName;

			if (firstName && lastName) {
				for (var key in req.body) {
					if (req.body[key] !== undefined) {
						db[key] = req.body[key];
					}
				}

				db.fullName = firstName + ' ' + lastName;

				db.save(
					function(err) {
						var response = {};

						if (err) {
							response = OBJ_ERROR;
						}
						else {
							response = {'data': db, 'success': true, 'message': 'Successfully submitted!'};
						}

						res.json(response);
					}
				);
			}
			else {
				res.json({'success': false, 'message': 'First name, last name, and email are all required fields.'});
			}
		}
	);

router.route('/api/recruits/:id')
	.get(
		function(req,res) {
			peopleModal.findById(
				req.params.id,
				function(err, data) {
					var response = {};

					if (err) {
						response = OBJ_ERROR;
					}
					else {
						response = data;
					}

					res.json(response);
				}
			);
		}
	)
	.put(
		function(req,res) {
			peopleModal.findById(
				req.params.id,
				function(err,data) {
					var response = {};

					if (err) {
						response = OBJ_ERROR
					}
					else {
						var firstName = req.body.firstName;
						var lastName = req.body.lastName;

						if (!firstName) {
							firstName = data.firstName;
						}

						if (!lastName) {
							lastName = data.lastName;
						}

						for (var key in req.body) {
							if (req.body[key] !== undefined) {
								data[key] = req.body[key];
							}
						}

						data.fullName = firstName + ' ' + lastName;

						data.save(
							function(err, newData) {
								if (err) {
									response = OBJ_ERROR;
								}
								else {
									response = {'data': newData, 'success': true, 'message': 'Data is updated for '+req.params.id};
								}

								res.json(response);
							}
						);
					}
				}
			);
		}
	)
	.delete(
		function(req,res) {
			peopleModal.findById(
				req.params.id,
				function(err,data) {
					var response = {};

					if (err) {
						response = OBJ_ERROR
					}
					else {
						peopleModal.remove(
							{_id: req.params.id},
							function(err) {
								if (err) {
									response = OBJ_ERROR;
								}
								else {
									response = {'success': true, 'message': 'Data associated with '+req.params.id+'is deleted'};
								}

								res.json(response);
							}
						);
					}
				}
			);
		}
	);

router.route('/api/skills')
	.get(
		function(req, res) {
			var term = req.query['term'];

			if (!term) {
				term = '';
			}

			var regex = new RegExp('.*' + term + '.*', 'i');

			skillsModel.find(
				{label: regex},
				function(err,data) {
				var response = {};

				if (err) {
					response = OBJ_ERROR;
				}
				else {
					response = data;
				}
				res.json(response);
			}
		);
		}
	)
	.post(
		function(req,res) {
			var db = new skillsModel();

			for (var key in req.body) {
				if (req.body[key] !== undefined) {
					db[key] = req.body[key];
				}
			}

			db.save(
				function(err) {
					var response = {};

					if (err) {
						response = OBJ_ERROR;
					}
					else {
						response = {'data': db, 'success': true, 'message': 'Successfully submitted!'};
					}

					res.json(response);
				}
			);
		}
	);


app.use('/',router);

app.listen(3000);
console.log('Listening to PORT 3000');