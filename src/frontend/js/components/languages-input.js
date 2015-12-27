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
	},

	bindAC: function() {
		var instance = this;

		$(this.refs.languages).autocomplete(
			{
				source: 'api/languages',
				minLength: 1,
				delay: 100,
				select: function(event, ui) {
					var item = ui.item;

					instance.addLanguage(item);

					$(this).val('');

					return false;
				}
			}
		);
	},

	addLanguage: function(language) {
		var recruit = this.state.recruit;

		recruit.spokenLanguages.push(language);

		this.setState({recruit: recruit});
	},

	removeLanguage: function(event) {
		var target = event.target;

		var id = target.getAttribute('data-id');

		var recruit = this.state.recruit;

		$.grep(
			recruit.spokenLanguages,
			function(item, index) {
				if (item._id == id) {
					recruit.spokenLanguages.splice(index,1);
				}
			}
		);

		this.setState({recruit: recruit});
	},

	onInputBlur: function(event) {
		$(event.currentTarget).val('');
	},

	render: function() {
		var instance = this;

		var recruit = this.state.recruit;

		return (
			<fieldset className="row form-group">
				<label htmlFor="languagesInput">What languages do you speak?</label>

				<div className="form-control combo-box">
				{
					recruit.spokenLanguages.map(
						function(language) {
							return (
								<span className="pill" key={language._id}>
									{language.label}
									<button data-id={language._id} onClick={instance.removeLanguage} type="button" className="close">
										<span aria-hidden="true">&times;</span>
										<span className="sr-only">Close</span>
									</button>
								</span>
							);
						}
					)
				}
				<input ref="languages" type="text" className="languages-input" onBlur={this.onInputBlur} placeholder="Aramaic, English, Klingon, etc" />
				</div>
			</fieldset>
		);
	}
});
