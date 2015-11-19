var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;

var people = {
	'comments': String,
	'email': String,
	'exampleCodeSnippet': String,
	'fieldOfStudy': String,
	'firstName': String,
	'fullName': String,
	'githubUsername': String,
	'gradTerm': Number,
	'home': String,
	'isMale': Boolean,
	'skills': [],
	'lastName': String,
	'missionsLocation': String,
	'profilePicture': String,
	'rating': 0,
	'school': String
};

module.exports = mongoose.model('people', people);