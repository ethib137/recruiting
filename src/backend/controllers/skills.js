var skillsModel = require('../models/skills');

var OBJ_ERROR = {'success': false, 'message': 'Unknown Error Occured'};

module.exports = function(router) {
	router.route('/api/skills')
		.get(
			function(req, res) {
				var term = req.query.term;
				var delta = req.query.delta;

				if (!term) {
					term = '';
				}

				if (!delta) {
					delta = null;
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
				}).limit(delta);
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
}