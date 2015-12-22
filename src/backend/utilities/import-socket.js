var peopleModal = require('../models/people');

module.exports = function(io) {
	io.on('connection', function(socket) {
		peopleModal.find(
			{},
			function(err,data) {
			var response = {};

			if (err) {
				response = OBJ_ERROR;
			}
			else {
				response = data;
			}

			socket.emit('initialRecruits', response);
		});
	});
}