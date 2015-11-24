/** @jsx React.DOM */
var React = require('react');
var GoogleMap = require('google-map-react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			map: null
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

	renderD3: function(dataPoints) {
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
				.data(dataPoints).enter()
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
		return (<div ref="mapContainer" className="map-container"></div>);
	}
});