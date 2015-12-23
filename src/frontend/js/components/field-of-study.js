/** @jsx React.DOM */
var React = require('react');

var toTitleCase = function(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

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

	removeMajor: function() {
		var recruit = this.state.recruit;

		recruit.fieldOfStudy = null;
		recruit.categoryOfStudy = null;

		this.setState({recruit: recruit});
	},

	bindAC: function() {
		var instance = this;

		var majorInput = this.refs.fieldOfStudy;

		$(majorInput).autocomplete(
			{
				source: '/api/majors',
				source: function(request, response) {
					$.ajax({
						url: '/api/majors',
						dataType: "json",
						data: request,
						success: function(data) {
							data.forEach(function(item, index) {
								data[index].label = toTitleCase(item.label);
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

					recruit.fieldOfStudy = item.label;
					recruit.categoryOfStudy = item.category;

					instance.setState({recruit: recruit});
				}
			}
		);
	},

	render: function() {
		var recruit = this.state.recruit;

		var pill = (
			<input ref="fieldOfStudy" type="text" className="form-control" name="fieldOfStudy" placeholder="Greek" />
		);


		if (recruit.fieldOfStudy) {
			pill = (
				<span className="pill">
					{recruit.fieldOfStudy}
					<button onClick={this.removeMajor} type="button" className="close">
						<span aria-hidden="true">&times;</span>
						<span className="sr-only">Close</span>
					</button>
				</span>
			);
		}

		return (
			<fieldset className="row form-group">
				<label htmlFor="fieldOfStudy">Undergraduate Major</label>

				<div>
					{pill}
				</div>
			</fieldset>
		);
	}
});