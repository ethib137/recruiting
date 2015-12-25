/** @jsx React.DOM */
var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
	contextTypes: {
		store: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			gradPercents: {},
			totalRecruits: 0
		};
	},

	componentDidMount: function() {
		var instance = this;

		var store = this.context.store;

		store.subscribe(function() {
			var recruits = store.getState().recruits;

			var gradPercents = instance.processGradTerms(recruits);

			instance.setState({gradPercents: gradPercents, totalRecruits: recruits.length});
		});
	},

	processGradTerms: function(recruits) {
		var currentDate = moment();

		var retObj = {
			2016: 0,
			2017: 0,
			2018: 0,
			'2019+': 0,
			Graduated: 0
		};

		recruits.forEach(function(item) {
			var date = item.gradTerm;

			if (date) {
				var gradDate = moment(date);

				var year = gradDate.get('year');

				if (year > 2015) {
					if (year === 2016) {
						retObj['2016'] += 1;
					}
					else if (year === 2017) {
						retObj['2017'] += 1;
					}
					else if (year === 2018) {
						retObj['2018'] += 1;
					}
					else {
						retObj['2019+'] += 1;
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
		var instance = this;

		var gradPercents = this.state.gradPercents;

		return (
			<div className="statistics grad-term-breakdown">
				<div className="breakdown-title">Percent of Attendees Graduating:</div>

				<div ref="attendeeBreakDown">
					{
						Object.keys(gradPercents).map(function(key) {
							var percent = (gradPercents[key] / instance.state.totalRecruits) * 100;
							var message = key + ': ' +Math.round(percent) + '%';

							return (
								<div className="percent" key={key}>
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