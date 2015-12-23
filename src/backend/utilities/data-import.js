var cityModel = require('../models/city');
var countryModel = require('../models/country');
var majorModel = require('../models/major');
var languageModel = require('../models/language');

var citiesJson = require('../../documents/staticFiles/cities');
var countriesJson = require('../../documents/staticFiles/countries');
var languagesJson = require('../../documents/staticFiles/languages');
var majorsJson = require('../../documents/staticFiles/majors');

module.exports = function() {
	languageModel.find({}, function(err, data) {
		console.log(data.length + ' languages');

		if (!data.length) {
			languageModel.collection.insertMany(languagesJson, function(err, r) {
				if (err) {
					console.log(err);
				}
			});
		}
	});

	cityModel.find({}, function(err, data) {
		console.log(data.length + ' cities');

		if (!data.length) {
			var cityData = [];

			citiesJson.forEach(function(item, index) {
				var data = {
					country: item.CountryCode,
					full: item.City + ', ' + item.State + ', ' + item.CountryCode,
					label: item.City,
					state: item.State
				};

				cityData.push(data);
			});

			cityModel.collection.insertMany(cityData, function(err, r) {
				if (err) {
					console.log(err);
				}
			});
		}
	});

	countryModel.find({}, function(err, data) {
		console.log(data.length + ' countries');

		if (!data.length) {
			var countryData = [];

			countriesJson.forEach(function(item, index) {
				var data = {
					label: item.name,
					code: item.code
				};

				countryData.push(data);
			});


			countryModel.collection.insertMany(countryData, function(err, r) {
				if (err) {
					console.log(err);
				}
			});
		}
	});

	majorModel.find({}, function(err, data) {
		console.log(data.length + ' majors');

		if (!data.length) {
			majorModel.collection.insertMany(majorsJson, function(err, r) {
				if (err) {
					console.log(err);
				}
			});
		}
	});
}