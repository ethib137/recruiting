/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	contextTypes: {
		store: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			men: 0,
			women: 0
		};
	},

	componentDidMount: function() {
		var instance = this;

		var store = this.context.store;

		store.subscribe(function() {
			var recruits = store.getState().recruits;

			if (recruits.length) {
				var men = 0;
				var women = 0;

				recruits.forEach(function(item) {
					if (item.isMale) {
						men += 1;
					}
					else {
						women += 1;
					}
				});

				instance.setState({men: men, women: women});
			}
		});
	},

	componentDidUpdate: function() {
		this.renderD3();
	},

	renderD3: function() {
		$(this.refs.attendeeBreakDown).html('');

		var total = this.state.women + this.state.men;

		var dataObj = [
			{
				color: '#0000FF',
				count: this.state.men,
				percent: Math.round(this.state.men / total * 100)
			},
			{
				color: '#FF69B4',
				count: this.state.women,
				percent: Math.round(this.state.women / total * 100)
			}
		];

		var width = 200;
		var height = 125;
		var radius = Math.min(width, height) / 2;

		var arc = d3.svg.arc()
			.outerRadius(radius - 10)
			.innerRadius(0);

		var pie = d3.layout.pie()
			.sort(null)
			.value(function(d) {
				return d.count;
			});

		var svg = d3.select(this.refs.attendeeBreakDown)
			.append('svg')
				.attr('width', width)
				.attr('height', height)
			.append('g')
				.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		var g = svg.selectAll('.arc')
			.data(pie(dataObj))
			.enter()
			.append('g')
				.attr('class', 'arc');

		g.append('path')
			.attr('d', arc)
			.style('fill', function(d, index) {
				return d.data.color;
			});
	},

	render: function() {
		var instance = this;

		var total = this.state.men + this.state.women;

		var menPercent = Math.round(this.state.men / total * 100);
		var womenPercent = Math.round(this.state.women / total * 100);

		return (
			<div className="statistics gender-breakdown">
				<div className="breakdown-title">Gender Breakdown:</div>

				<div ref="attendeeBreakDown"></div>
				<div>
					<div className="male-percent percent">Male: {menPercent}%</div>
					<div className="female-percent percent">Female: {womenPercent}%</div>
				</div>
			</div>
		);
	}
});