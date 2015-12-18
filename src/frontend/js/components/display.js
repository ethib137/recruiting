/** @jsx React.DOM */
var React = require('react');

var Map = require('./map');
var AttendeeSnapshot = require('./attendee-snapshot');
var FlagsRepresented = require('./flags-represented');

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
					<div ref="attendeeBreakDown" className="col-sm-2">
						<AttendeeSnapshot recruits={this.state.recruits} />
					</div>

					<Map recruits={this.state.recruits}/>

					<div className="col-sm-2">
						<div className="side-bar right">
							<FlagsRepresented recruits={this.state.recruits} />
						</div>
					</div>
				</div>

				<div ref="skillsBreakDownColumn" className="row side-bar bottom"></div>
			</div>
		);
	}
});