/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	contextTypes: {
		store: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			maxSize: 0,
			skills: []
		};
	},

	componentDidMount: function() {
		var instance = this;

		var store = this.context.store;

		store.subscribe(function() {
			var recruits = store.getState();

			instance.processSkills(recruits);
		});
	},

	componentDidUpdate: function() {
		this.renderD3();
	},

	processSkills: function(response) {
		var instance = this;

		var stateSkills = instance.state.skills;

		var skillsObj = {};

		response.forEach(function(item, index) {
			var skills = item.skills;

			if (skills) {
				skills.forEach(function(item) {
					var skill = item.label;

					if (skillsObj[skill]) {
						skillsObj[skill] += 1;
					}
					else {
						skillsObj[skill] = 1;
					}
				});
			}
		});

		var skillsArray = [];
		var maxSize = 0;

		$.each(skillsObj, function(key, val) {
			skillsArray.push({
				size: val,
				text: key
			})

			if (val > maxSize) {
				maxSize = val;
			}
		});

		instance.setState({skills: skillsArray, maxSize: maxSize});
	},

	renderD3: function() {
		var instance = this;

		$(instance.refs.attendeeBreakDown).html('');

		var height = 300;
		var width = 475;

		var data = this.state.skills;

		var maxNum = instance.state.maxSize;

		var size = d3.scale.linear()
			.domain([1, maxNum])
			.range([6, 30]);

		var draw = function(words) {
			d3.select(instance.refs.attendeeBreakDown).append('svg')
				.attr('width', width)
				.attr('height', height)
				.append('g')
					.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
					.selectAll('text')
					.data(words).enter()
						.append('text')
						.style('font-size', function(d) {
							return d.size + 'px';
						})
						.style('fill', '#FFF')
						.attr('text-anchor', 'middle')
						.attr('transform', function(d) {
							return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
						})
						.text(function(d) { return d.text; });
		}

		d3.layout.cloud().size([width, height])
			.words(data)
			.padding(1)
			.rotate(0)
			.fontSize(function(d) {
				return size(d.size);
			})
			.text(function(d) {
				return d.text;
			})
			.on('end', draw)
			.start();
	},

	render: function() {
		return (
			<div className="statistics skills-breakdown">
				<div>Skills Breakdown:</div>

				<div ref="attendeeBreakDown"></div>
			</div>
		);
	}
});