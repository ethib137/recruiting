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
	},

	componentDidUpdate: function() {
		var recruit = this.state.recruit;

		this.context.store.dispatch(setRecruit(recruit));
	},

	inputOnChange: function(event) {
		var recruit = this.state.recruit;

		recruit.gradTerm = this.refs.date.value;

		this.setState({recruit: recruit});
	},

	render: function() {
		var recruit = this.state.recruit;

		return (
			<fieldset className="row form-group">
				<label htmlFor="gradTerm">Graduation Date</label>
				<input ref="date" type="date" className="form-control date-picker" name="gradTerm" onChange={this.inputOnChange} />
			</fieldset>
		);
	}
});