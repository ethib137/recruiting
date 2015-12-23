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

		$(this.refs.skills).autocomplete(
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
						instance.addSkill(item);
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

	componentDidUpdate: function() {
		var recruit = this.state.recruit;

		this.context.store.dispatch(setRecruit(recruit));
	},

	addSkill: function(skill) {
		var recruit = this.state.recruit;

		recruit.skills.push(skill);

		this.setState({recruit: recruit});
	},

	removeSkill: function(event) {
		var target = event.target;

		var id = target.getAttribute('data-id');

		var recruit = this.state.recruit;

		$.grep(
			recruit.skills,
			function(item, index) {
				if (item._id == id) {
					recruit.skills.splice(index,1);
				}
			}
		);

		this.setState({recruit: recruit});
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
					instance.addSkill(response.data);
				},
				error: function(err) {
					console.log('error', err);
				}
			}
		);
	},

	onInputBlur: function(event) {
		$(event.currentTarget).val('');
	},

	render: function() {
		var instance = this;

		var recruit = this.state.recruit;

		return (
			<fieldset className="row form-group">
				<label htmlFor="skillsInput">Know any technical skills?</label>

				<div className="form-control">
				{
					recruit.skills.map(
						function(skill) {
							return (
								<span className="pill" key={skill._id}>
									{skill.label}
									<button data-id={skill._id} onClick={instance.removeSkill} type="button" className="close">
										<span aria-hidden="true">&times;</span>
										<span className="sr-only">Close</span>
									</button>
								</span>
							);
						}
					)
				}
				<input ref="skills" type="text" className="skills-input" onBlur={this.onInputBlur} placeholder="HTML, Java, Photoshop, etc" />
				</div>
			</fieldset>
		);
	}
});
