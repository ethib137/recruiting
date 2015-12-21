/** @jsx React.DOM */
var React = require('react');

var Map = require('./map');
var AttendeeSnapshot = require('./attendee-snapshot');
var FlagsRepresented = require('./flags-represented');
var GenderBreakdown = require('./gender-breakdown');
var StudyCategoryBreakdown = require('./category-of-study-breakdown');
var SkillsBreakdown = require('./skills-breakdown');

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
					<div className="col-sm-2">
						<AttendeeSnapshot recruits={this.state.recruits} />
					</div>

					<Map recruits={this.state.recruits}/>

					<div className="col-sm-2">
						<FlagsRepresented recruits={this.state.recruits} />
					</div>
				</div>

				<div ref="skillsBreakDownColumn" className="row">
					<div className="col-sm-4">
						<SkillsBreakdown />
					</div>

					<div className="col-sm-2">
						<GenderBreakdown />
					</div>

					<div className="col-sm-3">
						<StudyCategoryBreakdown recruits={this.state.recruits} />
					</div>

					<div className="col-sm-3">
						<div className="statistics two">
						</div>
					</div>
				</div>
			</div>
		);
	}
});