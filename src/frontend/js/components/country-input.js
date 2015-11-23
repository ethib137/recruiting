/** @jsx React.DOM */
var React = require('react');
var GeoUtil = require ('countries-cities');

module.exports = React.createClass({
	componentDidMount: function() {
		var instance = this;

		var countryInput = this.refs.countryInput.getDOMNode();

		$(countryInput).autocomplete(
			{
				source: GeoUtil.getCountries(),
				minLength: 1,
				delay: 100,
				select: function(event, ui) {
					var item = ui.item;

					var parent = instance.props.parent;

					var recruit = parent.state.recruit;

					recruit.missionsLocation = item.value;

					parent.setState({recruit: recruit});
				}
			}
		);
	},

	render: function() {
		var recruit = this.props.recruit;

		return (
			<fieldset className="form-group">
				<label for="missionsLocation">If you could live missionally in any country where would it be?</label>
				<input ref="countryInput" type="text" className="form-control" name="missionsLocation" placeholder="Country" defaultValue={recruit.missionsLocation} />
			</fieldset>
		);
	}
});