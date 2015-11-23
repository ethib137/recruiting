/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {};
	},

	componentDidMount: function() {
		var instance = this;

		instance.getRecruits();
	},

	render: function() {
		return (
			<div></div>
		);
	},

	getRecruits: function(filter) {
		var instance = this;

		$.ajax(
			{
				type: 'GET',
				url: '/api/recruits',
				success: function(response){
					console.log(response);
				},
				data: filter,
				dataType: 'json',
				contentType : 'application/json'
			}
		);
	}
});