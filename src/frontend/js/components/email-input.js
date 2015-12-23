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
	},

	componentDidUpdate: function() {
		var recruit = this.state.recruit;

		this.context.store.dispatch(setRecruit(recruit));
	},

	onInputBlur: function() {
		var first = this.refs.firstEmail.value;
		var second = this.refs.secondEmail.value;

		if (first && second) {
			if (first === second) {
				var recruit = this.state.recruit;

				recruit.email = first;

				this.setState({recruit: recruit});

				$(this.refs.warningEmail).removeClass('has-danger');
			}
			else {
				$(this.refs.warningEmail).addClass('has-danger');
			}
		}
	},

	render: function() {
		var instance = this;

		var recruit = this.state.recruit;

		return (
			<div className="row">
				<div className="col-md-4">
					<fieldset className="row form-group">
						<label className="form-control-label" htmlFor="email">Email</label>
						<small className="text-muted">(Required)</small>
						<input ref="firstEmail" type="text" className="form-control" name="email" onBlur={this.onInputBlur} placeholder="jim.elliot@gmail.com" value={recruit.email} />
					</fieldset>
				</div>
				<div className="col-md-4">
					<fieldset ref="warningEmail" className="row form-group">
						<label className="form-control-label" htmlFor="confirmEmail">Confirm Email</label>
						<small className="text-muted">(Required)</small>
						<input ref="secondEmail" type="text" className="form-control" name="confirmEmail" onBlur={this.onInputBlur} placeholder="jim.elliot@gmail.com" value={recruit.email} />
					</fieldset>
				</div>
			</div>
		);
	}
});
