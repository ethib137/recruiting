var majorModel = require('../models/major');

var defaultDelta = 5;

module.exports = function(router) {
	router.route('/api/majors')
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

				majorModel.find(
					{label: regex},
					function(err, data) {
						res.json(data);
					}
				).limit(delta);
			}
		);
}