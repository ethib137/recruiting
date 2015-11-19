var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;

var skills = {
	'label': String,
};

module.exports = mongoose.model('skills', skills);