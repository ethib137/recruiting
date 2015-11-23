/** @jsx React.DOM */
var React = require('react');

var History = require('react-router').History;

module.exports = React.createClass({
	mixins: [History],

	componentDidMount: function() {
		var instance = this;

		setTimeout(
			function() {
				instance.history.pushState(null, '/form');
			},
			5000
		);
	},

	render: function() {
		return (
			<div>
				Thanks! You were sent to BLANK
			</div>
		);
	}
});