/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	contextTypes: {
		store: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			newRecruits: []
		}
	},

	componentDidMount: function() {
		var instance = this;

		var store = instance.context.store;

		store.subscribe(function() {
			var storeData = store.getState();

			var newRecruits = instance.state.newRecruits;
			var newestRecruit = storeData.newestRecruit;

			if (newestRecruit) {
				newRecruits.push(newestRecruit);

				instance.setState({
					newRecruits: newRecruits
				});
			}
			else {
				setTimeout(function() {
					instance.cycleRecruits();
				}, 1500);
			}
		});
	},

	componentDidUpdate: function() {
		this.cycleRecruits();
	},

	cycleRecruits: function() {
		var instance = this;

		var newRecruits = instance.state.newRecruits;

		var recruit = newRecruits[0];

		if (recruit) {
			d3.select('#people' + recruit._id)
				.transition()
				.duration(2400)
				.attr('r', 50)
				.attr('fill', '#FFB700')
				.transition()
				.attr('fill', '#FFFFFF')
				.attr('r', 1.5)
				.each('end', function() {
					newRecruits.shift();

					instance.setState({
						newRecruits: newRecruits
					});
				});
		}
		else {
			var allRecruits = this.context.store.getState().recruits;

			var total = allRecruits.length;

			var numToAdd = 5;
			var randomIndex = Math.floor(Math.random() * (total));

			if (total < numToAdd) {
				numToAdd = total;
				randomIndex = 0;
			}

			var oldRecruitsToDisplay = allRecruits.slice(randomIndex, randomIndex + numToAdd);

			instance.setState({
				newRecruits: oldRecruitsToDisplay
			});
		}
	},

	render: function() {
		var majorNode = null;
		var schoolNode = null;

		var activeRecruit = this.state.newRecruits[0] || {};

		if (activeRecruit) {
			if (activeRecruit.fieldOfStudy) {
				majorNode = (
					<div>
						<span>Major:</span>
						{activeRecruit.fieldOfStudy}
					</div>
				);
			}

			if (activeRecruit.school) {
				schoolNode = (
					<div>
						<span>School:</span>
						{activeRecruit.school}
					</div>
				);
			}
		}

		return (
			<div className="snapshot statistics">
				<div>Attendee Snapshot:</div>

				<div className="img-container">
					<img src={activeRecruit.profilePicture} />
				</div>
				<div className="attendee-details text-center">
					<div>
						<span>Name:</span>
						{activeRecruit.firstName}
					</div>

					{schoolNode}
					{majorNode}
				</div>
			</div>
		);
	}
});