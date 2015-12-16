/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	componentDidMount: function() {
		var instance = this;

		var homeInput = this.refs.homeInput.getDOMNode();

		$(homeInput).autocomplete({
			source: function (request, response) {
				$.getJSON(
					"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
					function (data) {
						response(data);
					}
				);
			},
			minLength: 3,
			select: function (event, ui) {
				var selectedObj = ui.item;

				$(homeInput).val(selectedObj.value);

				var parent = instance.props.parent;

				var recruit = parent.state.recruit;

				recruit.home = selectedObj.value;

				parent.setState({recruit: recruit});
			},
			open: function () {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close: function () {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		 });
	},

	render: function() {
		var recruit = this.props.recruit;

		return (
			<fieldset className="row form-group">
				<label for="home">Where do you call home?</label>
				<input ref="homeInput" type="text" className="form-control" name="home" placeholder="Portland, Oregon, USA" value={recruit.home} />
			</fieldset>
		);
	}
});