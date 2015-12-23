/** @jsx React.DOM */
var React = require('react');

var History = require('react-router').History;

module.exports = React.createClass({
	mixins: [History],

	componentDidMount: function() {
		var instance = this;

		setTimeout(
			function() {
				window.location.href = window.location.origin + '/#/form';
			},
			5000
		);
	},

	render: function() {
		var cityName = this.props.location.query.city;
		var message = '';

		if (cityName) {
			message = 'You were sent to ' + cityName + '.';
		}

		return (
			<div>
				Thanks! {message}
			</div>
		);
	}
});