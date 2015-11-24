var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;

var people = {
	'geoPoints': Array,
	'comments': String,
	'email': String,
	'exampleCodeSnippet': String,
	'fieldOfStudy': String,
	'firstName': String,
	'fullName': String,
	'githubUsername': String,
	'gradTerm': String,
	'home': String,
	'isMale': Boolean,
	'lastName': String,
	'missionsCity': String,
	'missionsLocation': String,
	'profilePicture': String,
	'rating': String,
	'school': String,
	'skills': []
};

module.exports = mongoose.model('people', people);