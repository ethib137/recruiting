/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			countries: []
		};
	},

	getCountries: function() {
		$.ajax(
			{
				type: 'GET',
				url: '/api/countries',
				success: function(response){
					instance.setState({countries: response});
				},
				dataType: 'json',
				contentType : 'application/json'
			}
		);
	},

	render: function() {
		return (
			<div>
			</div>
		);
	}
});