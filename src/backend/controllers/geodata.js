var cityModel = require('../models/city');
var countryModel = require('../models/country');

var defaultDelta = 10;

module.exports = function(router) {
	router.route('/api/cities')
		.get(
			function(req, res) {
				var term = req.query.term;
				var delta = req.query.delta;

				if (!term) {
					term = '';
				}

				if (!delta) {
					delta = defaultDelta;
				}

				var regex = new RegExp('.*' + term + '.*', 'i');

				cityModel.find(
					{full: regex},
					function(err, data) {
						res.json(data);
					}
				).limit(delta);
			}
		);

	router.route('/api/countries')
		.get(
			function(req, res) {
				var term = req.query.term;
				var delta = req.query.delta;

				if (!term) {
					term = '';
				}

				if (!delta) {
					delta = defaultDelta;
				}

				var regex = new RegExp('.*' + term + '.*', 'i');

				countryModel.find(
					{label: regex},
					function(err, data) {
						res.json(data);
					}
				).limit(delta);
			}
		);
}