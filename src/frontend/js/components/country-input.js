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
		this.bindAC();
	},

	componentDidUpdate: function() {
		var recruit = this.state.recruit;

		this.context.store.dispatch(setRecruit(recruit));

		this.bindAC();
	},

	bindAC: function() {
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

	removeCountry: function() {
		var recruit = this.state.recruit;

		recruit.missionsLocation = null;

		this.setState({recruit: recruit});
	},

	onInputBlur: function(event) {
		$(event.currentTarget).val('');
	},

	render: function() {
		var recruit = this.state.recruit;

		var pill = (
			<input ref="countryInput" type="text" className="form-control" name="missionsLocation" onBlur={this.onInputBlur} placeholder="Ecuador" />
		);


		if (recruit.missionsLocation) {
			pill = (
				<span className="pill">
					{recruit.missionsLocation}
					<button onClick={this.removeCountry} type="button" className="close">
						<span aria-hidden="true">&times;</span>
						<span className="sr-only">Close</span>
					</button>
				</span>
			);
		}

		return (
			<fieldset className="row form-group">
				<label htmlFor="missionsLocation">If you could be on mission anywhere, where would it be?</label>
				<div>
					{pill}
				</div>
			</fieldset>
		);
	}
});