var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;

var major = {
	'category': String,
	'label': String
};

module.exports = mongoose.model('major', major);