/** @jsx React.DOM */
var React = require('react');

var Flag = require('react-flags');

module.exports = React.createClass({
	contextTypes: {
		store: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			countries: []
		};
	},

	componentDidMount: function() {
		var instance = this;

		var store = this.context.store;

		store.subscribe(function() {
			var recruits = store.getState().recruits;

			var countries = instance.processCountries(recruits);

			instance.setState({
				countries: countries
			});
		});
	},

	processCountries: function(data) {
		var countriesRepped = [];

		data.forEach(function(item) {
			var home = item.home;

			if (home && home[2] && countriesRepped.indexOf(home[2]) === -1) {
				countriesRepped.push(home[2]);
			}
		});

		return countriesRepped;
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
				<div className="breakdown-title">Countries Represented:</div>
				<div className="flag-container">
					{
						instance.state.countries.map(
							function(country) {
								if (country) {
									return (
										<span className="flag" key={country}>
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