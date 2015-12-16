/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	componentDidMount: function() {
		var instance = this;

		$(this.refs.gradTerm.getDOMNode()).datepicker(
			{
				onSelect: function(date) {
					var parent = instance.props.parent;

					var recruit = parent.state.recruit;

					recruit.gradTerm = date;

					parent.setState({recruit: recruit});
				}
			}
		);
	},

	render: function() {
		var recruit = this.props.recruit;

		return (
			<fieldset className="row form-group">
				<label for="gradTerm">Graduation Date</label>
				<input ref="gradTerm" type="text" className="form-control" name="gradTerm" placeholder="May 1949" value={recruit.gradTerm} />
			</fieldset>
		);
	}
});