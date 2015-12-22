/** @jsx React.DOM */
var React = require('react');

var toTitleCase = function(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

module.exports = React.createClass({
	componentDidMount: function() {
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

					var parent = instance.props.parent;

					var recruit = parent.state.recruit;

					recruit.fieldOfStudy = item.label;
					recruit.categoryOfStudy = item.category;

					parent.setState({recruit: recruit});
				}
			}
		);
	},

	render: function() {
		var recruit = this.props.recruit;

		return (
			<fieldset className="row form-group">
				<label for="fieldOfStudy">Undergraduate Major</label>
				<input ref="fieldOfStudy" type="text" className="form-control" name="fieldOfStudy" placeholder="Greek" value={recruit.fieldOfStudy} />
			</fieldset>
		);
	}
});