var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;

var country = {
	'code': Array,
	'label': String
};

module.exports = mongoose.model('country', country);