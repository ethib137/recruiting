/** @jsx React.DOM */
var React = require('react');

var LiferayOffices = [
	// Bangalore:
	[12.971599, 77.594563],
	// Budapest:
	[47.497912, 19.040235],
	// Casablanca:
	[33.573110, -7.589843],
	// Chicago:
	[41.878114, -87.629798],
	// Dalian:
	[38.914003, 121.614682],
	// Diamond Bar:
	[34.028623, -117.810337],
	// Dublin:
	[53.349805, -6.26031],
	// Eschborn:
	[50.146747, 8.561455],
	// Hamilton:
	[39.399501, -84.561335],
	// Leiden:
	[52.160114, 4.49701],
	// London:
	[51.507351, -0.127758],
	// Madrid:
	[40.416775, -3.70379],
	// Paris:
	[48.856614, 2.352222],
	// Recife:
	[-8.057838, -34.882897],
	// Sao Paulo:
	[-23.550520, -46.633309],
	// Singapore:
	[1.352083, 103.819836],
	// Sydney:
	[-33.867487, 151.20699],
	// Tokyo:
	[35.689487, 139.691706]
];

module.exports = React.createClass({
	componentDidUpdate: function() {
		var instance = this;

		instance.renderD3();
	},

	renderD3: function() {
		var instance = this;

		var width = 1110;
		var height = 555;

		var svg = d3.select(instance.refs.mapContainer.getDOMNode()).append('svg')
			.attr('width', width)
			.attr('height', height);

		var projection = d3.geo.equirectangular()
			.scale(180)
			.translate([width / 2, height / 2]);

		instance.renderMap(svg, projection);
	},

	renderLiferayOffices: function(svg, projection) {
		var fontSize = 12;

		// svg.selectAll('.pin')
		// 	.data(LiferayOffices).enter()
		// 	.append('text')
		// 		.attr('class', 'liferay-office')
		// 		.attr('font-size', fontSize)
		// 		.text('\uf1ad' )
		// 		.attr('transform', function(d) {
		// 			d = [d[1], d[0]];

		// 			var xy = projection(d);

		// 			xy = [xy[0] - (fontSize / 2), xy[1] + (fontSize / 2)]

		// 			return 'translate(' + xy + ')';
		// 		});
	},

	renderMap: function(svg, projection) {
		var instance = this;

		d3.json('/staticFiles/world-110m.json', function(error, topology) {
			svg.selectAll('path')
				.data(topojson.object(topology, topology.objects.countries).geometries).enter()
				.append('g')
				.append('path')
				.attr('d', d3.geo.path().projection(projection));

			instance.renderUserPins(svg, projection);
			instance.renderLiferayOffices(svg, projection);
		});
	},

	renderUserPins: function(svg, projection) {
		var instance = this;

		svg.selectAll('.pin')
			.data(instance.props.recruits).enter()
			.append('circle')
				.attr('class', 'map-user')
				.attr('r', 2.5)
				.attr('fill', '#FFFFFF')
				.attr('opacity', '0.3')
				.attr('id', function(d) {
					return 'people' + d._id;
				})
				.attr('transform', function(d) {
					var arr = [d.geoPoints[1], d.geoPoints[0]];

					return 'translate(' + projection(arr) + ')';
				});
	},

	render: function() {
		return (
			<div ref="mapContainer" className="col-sm-8 map-container"></div>
		);
	}
});