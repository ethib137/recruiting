/** @jsx React.DOM */
var React = require('react');
var GoogleMap = require('google-map-react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			map: null,
			coordinates: null
		}
	},

	getRecruits: function(filter) {
		var instance = this;

		$.ajax(
			{
				type: 'GET',
				url: '/api/recruits',
				success: function(response){
					instance.renderD3(response);
					instance.renderSkillsGraph(response);
				},
				data: filter,
				dataType: 'json',
				contentType : 'application/json'
			}
		);
	},

	componentDidMount: function() {
		this.getRecruits(this.state.coordinates)
	},

	renderSkillsGraph: function(data) {
		var instance = this;

		var totalSkills = {};
		var max = 0;

		data.forEach(function(item) {
			var skills = item.skills;

			skills.forEach(function(item) {
				if (totalSkills[item.label]) {
					totalSkills[item.label] += 1;
				}
				else {
					totalSkills[item.label] = 1;
				}
			});
		});

		var array = $.map(totalSkills, function(value, index) {
			if (value > max) {
				max = value;
			}

			return {
				count: value,
				name: index
			}
		});

		var svg = d3.select(this.refs.skillsBreakDownColumn.getDOMNode()).append('svg')
			.attr('height', 1000);

		var barHeight = 50;

		var bar = svg.selectAll('.chart')
			.attr("height", barHeight)
			.data(array)
			.enter()
			.append('g')
				.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

			bar.append('rect')
				.attr('width', function(d) {
					var widthPercent = (d.count / max) * 100;

					return widthPercent + '%';
				})
				.attr('height', barHeight - 1)
				.attr('fill', '#1c75b9')
			bar.append('text')
				.attr('y', barHeight / 2)
				.attr('x', 10)
				.text(function(d) {
					return d.name + ' (' + d.count + ')';
				})
				.attr('fill', '#FFF');
	},

	renderD3: function(data) {
		var width = 960;
		var height = 480;

		var svg = d3.select(this.refs.mapContainer.getDOMNode()).append('svg')
			.attr('width', width)
			.attr('height', height);

		var projection = d3.geo.equirectangular();

		var path = d3.geo.path()
			.projection(projection);

		d3.json('/staticFiles/world-110m.json', function(error, topology) {
			svg.selectAll('path')
				.data(topojson.object(topology, topology.objects.countries).geometries).enter()
				.append('g')
				.append('path')
				.attr('d', path)

			svg.selectAll('.pin')
				.data(data).enter()
				.append('circle')
					.attr('r', 3)
					.attr('transform', function(d) {
						var arr = [d.geoPoints[1], d.geoPoints[0]];

						return 'translate(' + projection(arr) + ')';
					})
					.attr('fill', '#FFF')
					.attr('stroke', '#000')

					// This is for using profilePictures as pins

					// .attr('fill', function(d) {
					// 	var defs = svg.append('defs');

					// 	defs.append('svg:pattern')
					// 		.attr('id', function() {
					// 			return d._id;
					// 		})
					// 		.attr('height', 1)
					// 		.attr('width', 1)
					// 	.append('svg:image')
					// 		.attr('height', 10)
					// 		.attr('width', 10)
					// 		.attr('x', 0)
					// 		.attr('y', 0)
					// 		.attr('xlink:href', function() {
					// 			return d.profilePicture;
					// 		})

					// 		return 'url(#' + d._id + ')';
					// })
		});
	},

	render: function() {
		return (
			<div className="display-page">
				<div className="banner">
					<h2>Liferay Inc.</h2>
					<span>Open Source. For Life.</span>
				</div>
				<div className="display-container">
					<div ref="skillsBreakDownColumn" className="column-graph-container">
						<h3>Skills Breakdown</h3>
					</div>
					<div className="column-two">
						<div className="skills-row">
							<h3>Attendee Breakdown</h3>
						</div>
						<div ref="mapContainer" className="map-container"></div>
					</div>
				</div>
			</div>
		);
	}
});