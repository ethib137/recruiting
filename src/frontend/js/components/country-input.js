/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	componentDidMount: function() {
		var instance = this;

		var countryInput = this.refs.countryInput.getDOMNode();

		$.ajax(
			{
				url: 'staticData//countries.json',
				type: 'GET',
				dataType: "json",
				success: function(json) {
					$(countryInput).autocomplete(
						{
							source: json,
							minLength: 1,
							delay: 100,
							select: function(event, ui) {
								var item = ui.item;

								var parent = instance.props.parent;

								var recruit = parent.state.recruit;

								recruit.home = item.value;

								parent.setState({recruit: recruit});
							}
						}
					);
				},
				error: function(err) {
					console.log('error', err);
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