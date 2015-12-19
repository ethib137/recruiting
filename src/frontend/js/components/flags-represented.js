/** @jsx React.DOM */
var React = require('react');

var Flag = require('react-flags');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			countries: []
		};
	},

	componentDidMount: function() {
		this.getCountries();
	},

	getCountries: function() {
		var instance = this;

		$.ajax(
			{
				type: 'GET',
				url: '/api/recruits/countries',
				success: function(response){
					instance.setState({countries: response});
				},
				data: {
					delta: 0
				},
				dataType: 'json',
				contentType : 'application/json'
			}
		);
	},

	render: function() {
		var instance = this;

		return (
			<div className="statistics flags">
				<div>Countries Represented:</div>
				<div className="flag-container">
					{
						instance.state.countries.map(
							function(country) {
								if (country) {
									return (
										<span className="flag">
											<Flag basePath="documents/flags" country={country} format="png" pngSize={64} shiny={false} />
										</span>
									);
								}
							}
						)
					}
				</div>
			</div>
		);
	}
});