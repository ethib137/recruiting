/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	componentDidMount: function() {
		var instance = this;

		var source = function(request, response) {
			$.ajax(
				{
					url: 'api/skills?term=' + request.term,
					type: 'GET',
					dataType: "json",
					success: function(data) {
						var nameArray = $.map(data, function(item) {
							return item.label.toLowerCase();
						});

						var term = request.term;

						if (nameArray.indexOf(term.toLowerCase()) === -1) {
							data.push(
								{
									label: 'Create new skill: ' + term,
									newSkill: true,
									value: term
								}
							);
						}

						response(data);
					},
					error: function(err) {
						console.log('error', err);
					}
				}
			);
		};

		$(this.refs.skills.getDOMNode()).autocomplete(
			{
				source: source,
				minLength: 1,
				delay: 100,
				select: function(event, ui) {
					var item = ui.item;

					if (item.newSkill) {
						instance.postNewSkill(item);
					}
					else {
						instance.props.parent.addSkill(item);
					}

					$(this).val('');

					return false;
				}
			}
		).autocomplete( "instance" )._renderItem = function(ul, item) {
			return $( "<li>" )
				.attr("data-value", item.value)
				.attr("data-newSkill", item.newSkill)
				.append( item.label )
				.appendTo( ul );
		};
	},

	postNewSkill: function(item) {
		var instance = this;

		$.ajax(
			{
				url: 'api/skills',
				type: 'POST',
				dataType: "json",
				data: {label: item.value},
				success: function(response) {
					instance.props.parent.addSkill(response.data);
				},
				error: function(err) {
					console.log('error', err);
				}
			}
		);
	},

	render: function() {
		var instance = this;

		var recruit = this.props.recruit;

		return (
			<fieldset className="form-group">
				<label for="skillsInput">Know any sweet skills or languages?</label>
				<div className="form-control">
				{
					recruit.skills.map(
						function(skill) {
							return (
								<span className="skill-pill">
									{skill.label}
									<button data-id={skill._id} onClick={instance.props.parent.removeSkill} type="button" className="close">
										<span aria-hidden="true">&times;</span>
										<span className="sr-only">Close</span>
									</button>
								</span>
							);
						}
					)
				}
				<input ref="skills" type="text" className="skills-input" placeholder="Aramaic, Java, Klingon, etc" />
				</div>
			</fieldset>
		);
	}
});
