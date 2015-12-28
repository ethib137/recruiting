var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;

var city = {
	'country': String,
	'full': String,
	'label': String,
	'latitude': Number,
	'longitude': Number,
	'state': String
};

module.exports = mongoose.model('city', city);