/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	contextTypes: {
		store: React.PropTypes.object
	},

	getInitialState: function() {
		var recruits = this.context.store.getState();

		return {
			activeRecruit: recruits[0] || {},
			allRecruits: recruits || []
		}
	},

	componentDidMount: function() {
		var instance = this;

		var store = this.context.store;

		store.subscribe(function() {
			var recruits = store.getState();

			if (recruits.length) {
				instance.setState({
					activeRecruit: recruits[0],
					allRecruits: recruits
				});

				instance.cycleRecruits();
			}
		});
	},

	cycleRecruits: function() {
		var instance = this;

		this.state.allRecruits.forEach(
			function(item, index) {
				setTimeout(
					function() {
						instance.setState({
							activeRecruit: item
						});

						d3.select('#people' + item._id)
							.transition()
							.duration(2400)
							.attr('r', 50)
							.attr('fill', '#FFB700')
							.transition()
							.attr('fill', '#FFFFFF')
							.attr('r', 1.5)
					},
					5000 * index
				);
			}
		);
	},

	render: function() {
		var majorNode = null;
		var schoolNode = null;

		if (this.state.activeRecruit.fieldOfStudy) {
			majorNode = (
				<div>
					<span>Major:</span>
					{this.state.activeRecruit.fieldOfStudy}
				</div>
			);
		}

		if (this.state.activeRecruit.school) {
			schoolNode = (
				<div>
					<span>School:</span>
					{this.state.activeRecruit.school}
				</div>
			);
		}

		return (
			<div className="snapshot statistics">
				<div>Attendee Snapshot:</div>

				<div className="img-container">
					<img src={this.state.activeRecruit.profilePicture} />
				</div>
				<div className="attendee-details text-center">
					<div>
						<span>Name:</span>
						{this.state.activeRecruit.firstName}
					</div>

					{schoolNode}
					{majorNode}
				</div>
			</div>
		);
	}
});