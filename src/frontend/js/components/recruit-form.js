/** @jsx React.DOM */
var React = require('react');

var HomeInput = require('./home-input');
var MissionsInput = require('./country-input');
var FieldOfStudyInput = require('./field-of-study');
var GradTermInput = require('./grad-date');
var SkillsInput = require('./skills-input');
var VideoInput = require('./photobooth');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			autoplay: true,
			showVideo: true,
			countdown: null,
			recruit: {
				comments: null,
				email: null,
				exampleCodeSnippet: null,
				fieldOfStudy: null,
				firstName: null,
				fullName: null,
				githubUsername: null,
				gradTerm: null,
				home: null,
				isMale: 1,
				lastName: null,
				missionsLocation: null,
				profilePicture: null,
				rating: 0,
				school: null,
				skills: []
			}
		};
	},

	componentDidMount: function() {
		var id = this.props.params.id;

		if (id) {
			$.get(
			'/api/recruits/' + id,
			function(data){
				this.setState(
					{
						autoplay: false,
						showVideo: false,
						edit: true,
						recruit: data
					}
				);
			}.bind(this));
		}
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

		console.log(recruit.skills);

		this.setState({recruit: recruit});
	},

	onInputChange: function(event) {
		var targetInput = event.target;

		var recruit = this.state.recruit;

		recruit[targetInput.name] = targetInput.value;

		this.setState({recruit: recruit});
	},

	onSubmit: function(event) {
		var instance = this;

		event.preventDefault();

		var config = {
			type: 'POST',
			url: '/api/recruits'
		}

		if (this.state.edit) {
			config = {
				type: 'PUT',
				url: '/api/recruits/' + this.state.recruit._id
			}
		}

		$.ajax(
			$.extend(
				config,
				{
					data: JSON.stringify(this.state.recruit),
					success: function(response){
						console.log('Success!', response);
					},
					dataType: 'json',
					contentType : 'application/json'
				}
			)
		);
	},

	render: function () {
		var recruit = this.state.recruit;

		var adminInputs;

		if (this.props.params.id) {
			adminInputs = (
				<div className="admin-only">
					<fieldset className="form-group">
						<label for="comments">Comments</label>
						<textarea className="form-control" name="comments" rows="5" placeholder="Admin Comments Here" value={recruit.comments} ></textarea>
					</fieldset>

					<fieldset className="form-group">
						<label for="rating">Rating</label>
						<select className="form-control" name="rating" defaultValue={recruit.rating}>
							<option>-</option>
							<option>+</option>
							<option>++</option>
						</select>
					</fieldset>
				</div>
			);
		}

		return (
			<div>
				<h3>Liferay Form</h3>
				<form action="" onSubmit={this.onSubmit} onChange={this.onInputChange}>
					<fieldset className="form-group">
						<label for="firstName">First Name</label>
						<small className="text-muted">(Required)</small>
						<input type="text" className="form-control" name="firstName" placeholder="Foo" value={recruit.firstName} />
					</fieldset>

					<fieldset className="form-group">
						<label for="lastName">Last Name</label>
						<small className="text-muted">(Required)</small>
						<input type="text" className="form-control" name="lastName" placeholder="Bar" value={recruit.lastName} />
					</fieldset>

					<fieldset className="form-group">
						<label for="email">Email</label>
						<small className="text-muted">(Required)</small>
						<input type="text" className="form-control" name="email" placeholder="Baz" value={recruit.email} />
					</fieldset>

					<fieldset className="form-group">
						<label for="isMale">Gender</label>
						<select className="form-control" name="isMale" defaultValue={recruit.isMale ? 'Male' : 'Female'}>
							<option>Male</option>
							<option>Female</option>
						</select>
					</fieldset>

					<HomeInput recruit={recruit} parent={this} />

					<MissionsInput recruit={recruit} parent={this} />

					<fieldset className="form-group">
						<label for="school">School</label><small className="text-muted">(Only if applicable)</small>
						<input type="text" className="form-control" name="school" placeholder="Qux" value={recruit.school} />
					</fieldset>

					<FieldOfStudyInput recruit={recruit} parent={this} />

					<GradTermInput recruit={recruit} parent={this} />

					<SkillsInput recruit={recruit} parent={this} />

					<VideoInput recruit={recruit} parent={this} />

					<fieldset className="form-group">
						<label for="exampleCodeSnippet">Know any code? Say hello to the world!</label>
						<textarea className="form-control" name="exampleCodeSnippet" rows="5" placeholder="Hello World" value={recruit.exampleCodeSnippet} ></textarea>
					</fieldset>

					<fieldset className="form-group">
						<label for="githubUsername">Github Username</label>
						<input type="text" className="form-control" name="githubUsername" placeholder="https://github.com/Corge" value={recruit.githubUsername} />
					</fieldset>

					{adminInputs}

					<button className="btn btn-primary" type="submit">Submit</button>
				</form>
			</div>
		);
	}
});