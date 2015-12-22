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

		var countryInput = this.refs.countryInput;

		$(countryInput).autocomplete(
			{
				source: '/api/countries',
				minLength: 1,
				delay: 100,
				select: function(event, ui) {
					var item = ui.item;

					var recruit = instance.state.recruit;

					recruit.missionsLocation = item.label;

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
				<label htmlFor="missionsLocation">If you could be on mission anywhere, where would it be?</label>
				<input ref="countryInput" type="text" className="form-control" name="missionsLocation" placeholder="Ecuador" value={recruit.missionsLocation} />
			</fieldset>
		);
	}
});