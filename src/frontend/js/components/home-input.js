/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	componentDidMount: function() {
		var instance = this;

		var homeInput = this.refs.homeInput.getDOMNode();

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

					var parent = instance.props.parent;

					var recruit = parent.state.recruit;

					recruit.home = [item.label, item.state, item.country];

					parent.setState({recruit: recruit});
				}
			}
		);
	},

	render: function() {
		var recruit = this.props.recruit;

		return (
			<fieldset className="row form-group">
				<label for="home">Where do you call home?</label>
				<input ref="homeInput" type="text" className="form-control" name="home" placeholder="Portland, OR, USA" value={recruit.home} />
			</fieldset>
		);
	}
});