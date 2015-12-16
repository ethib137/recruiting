/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	componentDidMount: function() {
		var instance = this;

		var majorInput = this.refs.fieldOfStudy.getDOMNode();

		$.ajax(
			{
				url: 'staticFiles/majors.json',
				type: 'GET',
				dataType: "json",
				success: function(json) {
					$(majorInput).autocomplete(
						{
							source: json,
							minLength: 1,
							delay: 100,
							select: function(event, ui) {
								var item = ui.item;

								var parent = instance.props.parent;

								var recruit = parent.state.recruit;

								recruit.fieldOfStudy = item.value;

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
			<fieldset className="row form-group">
				<label for="fieldOfStudy">Undergraduate Major</label>
				<input ref="fieldOfStudy" type="text" className="form-control" name="fieldOfStudy" placeholder="Greek" value={recruit.fieldOfStudy} />
			</fieldset>
		);
	}
});