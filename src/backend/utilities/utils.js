var fs = require('fs');
var geocoder = require('node-geocoder')('google', 'http', null);
var mkdirp = require('mkdirp');
var path = require('path');

module.exports = {
	decodeBase64Image: function(dataString) {
		var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
		var response = {};

		if (matches.length !== 3) {
			return new Error('Invalid input string');
		}

		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');

		return response;
	},

	getGeoPoints: function(location, callback) {
		geocoder.geocode(location, function(err, res) {
			if (!err) {
				if (!res.length) {
					res = [{latitude: null, longitude: null}];
				}

				var latitude = res[0].latitude;
				var longitude = res[0].longitude;

				callback([latitude, longitude]);
			}
			else {
				console.log(err);

				callback(null);
			}
		});
	},

	writeImage: function(imageBuffer, fileName, callback) {
		var userImageDirectory = path.join(__dirname, '../../documents/user-images/');

		mkdirp(userImageDirectory, function(err) {
			if (err) {
				return;
			}

			var filePath = userImageDirectory + fileName + '.jpg'

			fs.writeFile(filePath, imageBuffer.data, function(err) {});

			var filePath = '/documents/user-images/' + fileName + '.jpg';

			if (callback) {
				callback(filePath);
			}
		});
	}
};