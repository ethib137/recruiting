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
				gradYear: null,
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

	onInputChange: function(event) {
		var targetInput = event.target;

		var recruit = this.state.recruit;

		recruit[targetInput.name] = targetInput.value;

		this.setState({recruit: recruit})
	},

	onSubmit: function(event) {
		var instance = this;

		event.preventDefault();

		$.ajax({
			type: 'POST',
			url: '/api/recruits',
			data: JSON.stringify(this.state.recruit),
			success: function(response){
				console.log('Success!', response);
			},
			dataType: 'json',
			contentType : 'application/json'
		});
	},

	render: function () {
		var recruit = this.state.recruit;

		return (
			<div>
				<h3>Liferay Form</h3>
				<form action="" onSubmit={this.onSubmit} onChange={this.onInputChange}>
					<fieldset className="form-group">
						<label for="firstName">First Name</label>
						<small className="text-muted">(Required)</small>
						<input type="text" className="form-control" name="firstName" placeholder="Foo" defaultValue={recruit.firstName} />
					</fieldset>

					<fieldset className="form-group">
						<label for="lastName">Last Name</label>
						<small className="text-muted">(Required)</small>
						<input type="text" className="form-control" name="lastName" placeholder="Bar" defaultValue={recruit.lastName} />
					</fieldset>

					<fieldset className="form-group">
						<label for="email">Email</label>
						<small className="text-muted">(Required)</small>
						<input type="text" className="form-control" name="email" placeholder="Baz" defaultValue={recruit.email} />
					</fieldset>

					<div class="radio-inline">
						<label>
							<input type="radio" name="isMale" defaultValue="true" />Male
						</label>
						<label>
							<input type="radio" name="isMale" defaultValue="false" />Female
						</label>
					</div>

					<HomeInput recruit={recruit} parent={this} />

					<MissionsInput recruit={recruit} parent={this} />

					<fieldset className="form-group">
						<label for="school">School</label><small className="text-muted">(Only if applicable)</small>
						<input type="text" className="form-control" name="school" placeholder="Qux" defaultValue={recruit.school} />
					</fieldset>

					<FieldOfStudyInput recruit={recruit} parent={this} />

					<GradTermInput recruit={recruit} parent={this} />

					<SkillsInput recruit={recruit} parent={this} />

					<VideoInput recruit={recruit} parent={this} />

					<fieldset className="form-group">
						<label for="exampleCodeSnippet">Know any code? Say hello to the world!</label>
						<textarea className="form-control" name="exampleCodeSnippet" rows="5" placeholder="Hello World" defaultValue={recruit.exampleCodeSnippet} ></textarea>
					</fieldset>

					<fieldset className="form-group">
						<label for="githubUsername">Github Username</label>
						<input type="text" className="form-control" name="githubUsername" placeholder="https://github.com/Corge" defaultValue={recruit.githubUsername} />
					</fieldset>

					<button className="btn btn-primary" type="submit">Submit</button>
				</form>
			</div>
		);
	}
});