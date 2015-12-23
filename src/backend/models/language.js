var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;

var language = {
	'label': String
};

module.exports = mongoose.model('language', language);