var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;

var people = {
	'geoPoints': Array,
	'categoryOfStudy': String,
	'comments': String,
	'contactMe': Boolean,
	'confirmEmail': String,
	'email': String,
	'fieldOfStudy': String,
	'firstName': String,
	'fullName': String,
	'githubUsername': String,
	'gradTerm': String,
	'home': Array,
	'isMale': Boolean,
	'lastName': String,
	'missionsLocation': String,
	'portfolioSite' : String,
	'profilePicture': String,
	'rating': String,
	'school': String,
	'skills': []
};

module.exports = mongoose.model('people', people);