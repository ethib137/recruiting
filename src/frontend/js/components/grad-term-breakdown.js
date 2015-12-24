/** @jsx React.DOM */
var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
	contextTypes: {
		store: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			gradPercents: {}
		};
	},

	componentDidMount: function() {
		var instance = this;

		var store = this.context.store;

		store.subscribe(function() {
			var recruits = store.getState().recruits;

			var gradPercents = instance.processGradTerms(recruits);

			instance.setState({gradPercents: gradPercents});
		});
	},

	processGradTerms: function(recruits) {
		var currentDate = moment();

		var retObj = {
			100: 0,
			300: 0,
			500: 0,
			800: 0,
			1000: 0,
			'1000+': 0,
			Graduated: 0
		};

		recruits.forEach(function(item) {
			var date = item.gradTerm;

			if (date) {
				var gradDate = moment(date);

				var diff = gradDate.diff(currentDate, 'days');

				if (diff > 0) {
					if (diff < 100) {
						retObj['100'] += 1;
					}
					else if (diff < 300) {
						retObj['300'] += 1;
					}
					else if (diff < 500) {
						retObj['500'] += 1;
					}
					else if (diff < 800) {
						retObj['800'] += 1;
					}
					else if (diff < 1000) {
						retObj['1000'] += 1;
					}
					else {
						retObj['1000+'] += 1;
					}
				}
				else {
					retObj.Graduated += 1;
				}
			}
		});

		return retObj;
	},

	render: function() {
		var gradPercents = this.state.gradPercents;

		return (
			<div className="statistics grad-term-breakdown">
				<div>Graduation Breakdown:</div>

				<div ref="attendeeBreakDown">
					{
						Object.keys(gradPercents).map(function(key) {
							var message = '< ' + key + ' days: ' + gradPercents[key];

							return (
								<div key={key}>
									{message}
								</div>
							);
						})
					}
				</div>
			</div>
		);
	}
});