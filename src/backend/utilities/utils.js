var fs = require('fs');
var geocoder = require('node-geocoder')('google', 'http', null);
var GeoUtil = require ('countries-cities');
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
			if (err) {
				res = [{latitude: null, longitude: null}];
			}

			var latitude = res[0].latitude;
			var longitude = res[0].longitude;

			callback([latitude, longitude]);
		});
	},

	writeImage: function(imageBuffer, fileName, callback) {
		var documentsDirectory = path.join(__dirname, '../../documents/');

		mkdirp(documentsDirectory, function(err) {
			if (err) {
				return;
			}

			var filePath = documentsDirectory + fileName + '.jpg'

			fs.writeFile(filePath, imageBuffer.data, function(err) {});

			var filePath = '/documents/user-images/' + fileName + '.jpg';

			if (callback) {
				callback(filePath);
			}
		});
	}
};