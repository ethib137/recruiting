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

	bindAC: function() {
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

		this.bindAC();
	},

	removeHome: function() {
		var recruit = this.state.recruit;

		recruit.home = null;

		this.setState({recruit: recruit});
	},

	render: function() {
		var recruit = this.state.recruit;

		var pill = (
			<input ref="homeInput" type="text" className="form-control" name="home" placeholder="Portland, OR, USA" />
		);


		if (recruit.home && recruit.home.length) {
			pill = (
				<span className="pill">
					{recruit.home[0]}
					<button onClick={this.removeHome} type="button" className="close">
						<span aria-hidden="true">&times;</span>
						<span className="sr-only">Close</span>
					</button>
				</span>
			);
		}

		return (
			<fieldset className="row form-group">
				<label htmlFor="home">Where do you call home?</label>

				<div>
					{pill}
				</div>
			</fieldset>
		);
	}
});