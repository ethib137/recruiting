/** @jsx React.DOM */
var React = require('react');

var AttendeeSnapshot = require('./attendee-snapshot');
var FlagsRepresented = require('./flags-represented');
var GenderBreakdown = require('./gender-breakdown');
var GradTermBreakdown = require('./grad-term-breakdown');
var Map = require('./map');
var SkillsBreakdown = require('./skills-breakdown');
var StudyCategoryBreakdown = require('./category-of-study-breakdown');


module.exports = React.createClass({
	render: function() {
		return (
			<div className="display-page">
				<div className="row">
					<div className="col-sm-2">
						<AttendeeSnapshot />
					</div>

					<Map />

					<div className="col-sm-2">
						<FlagsRepresented />
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
						<StudyCategoryBreakdown />
					</div>

					<div className="col-sm-3">
						<GradTermBreakdown />
					</div>
				</div>
			</div>
		);
	}
});