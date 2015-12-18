/** @jsx React.DOM */
var React = require('react');

var Map = require('./map');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			recruits: []
		}
	},

	getRecruits: function(filter) {
		var instance = this;

		$.ajax(
			{
				type: 'GET',
				url: '/api/recruits',
				success: function(response){
					instance.setState({recruits: response});
				},
				data: filter,
				dataType: 'json',
				contentType : 'application/json'
			}
		);
	},

	componentDidMount: function() {
		this.getRecruits()
	},

	render: function() {
		return (
			<div className="display-page">
				<div className="row">
					<div ref="attendeeBreakDown" className="col-sm-2 side-bar left"></div>

					<Map recruits={this.state.recruits}/>

					<div className="map-legend">
						<span><i className="fa fa-map-pin"></i>: Liferay Office Locations</span>
					</div>

					<div className="col-sm-2 side-bar right"></div>
				</div>
				<div ref="skillsBreakDownColumn" className="row side-bar bottom"></div>
			</div>
		);
	}
});