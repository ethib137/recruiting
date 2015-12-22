/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	componentDidMount: function() {
		var instance = this;

		var countryInput = this.refs.countryInput;

		$(countryInput).autocomplete(
			{
				source: '/api/countries',
				minLength: 1,
				delay: 100,
				select: function(event, ui) {
					var item = ui.item;

					var parent = instance.props.parent;

					var recruit = parent.state.recruit;

					recruit.missionsLocation = item.label;

					parent.setState({recruit: recruit});
				}
			}
		);
	},

	render: function() {
		var recruit = this.props.recruit;

		return (
			<fieldset className="row form-group">
				<label for="missionsLocation">If you could be on mission anywhere, where would it be?</label>
				<input ref="countryInput" type="text" className="form-control" name="missionsLocation" placeholder="Ecuador" value={recruit.missionsLocation} />
			</fieldset>
		);
	}
});