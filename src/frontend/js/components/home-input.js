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

		var homeInput = this.refs.homeInput;

		$(homeInput).autocomplete(
			{
				source: function(request, response) {
					$.ajax({
						url: '/api/cities',
						dataType: "json",
						data: request,
						success: function(data) {
							data.forEach(function(item, index) {
								data[index].label = item.label + ', ' + item.state + ', ' + item.country;
							});

							response(data);
						}
					});
				},
				minLength: 1,
				delay: 100,
				select: function(event, ui) {
					var item = ui.item;

					var recruit = instance.state.recruit;

					recruit.home = [item.label, item.state, item.country];

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
				<label htmlFor="home">Where do you call home?</label>
				<input ref="homeInput" type="text" className="form-control" name="home" placeholder="Portland, OR, USA" value={recruit.home} />
			</fieldset>
		);
	}
});