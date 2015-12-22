/** @jsx React.DOM */
var React = require('react');

var setRecruit = require('../redux/actions/set-recruit');

module.exports = React.createClass({
	contextTypes: {
		store: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			recruit: this.context.store.getState()
		}
	},

	componentDidMount: function() {
		var instance = this;

		$(this.refs.gradTerm).datepicker(
			{
				onSelect: function(date) {
					var recruit = instance.state.recruit;

					recruit.gradTerm = date;

					instance.setState({recruit: recruit});
				}
			}
		);
	},

	componentDidUpdate: function() {
		var recruit = this.state.recruit;

		this.context.store.dispatch(setRecruit(recruit));
	},

	render: function() {
		var recruit = this.state.recruit;

		return (
			<fieldset className="row form-group">
				<label htmlFor="gradTerm">Graduation Date</label>
				<input ref="gradTerm" type="text" className="form-control" name="gradTerm" placeholder="May 1949" value={recruit.gradTerm} />
			</fieldset>
		);
	}
});