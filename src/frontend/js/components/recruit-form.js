/** @jsx React.DOM */
var React = require('react');

var HomeInput = require('./home-input');
var MissionsInput = require('./country-input');
var FieldOfStudyInput = require('./field-of-study');
var GradTermInput = require('./grad-date');
var SkillsInput = require('./skills-input');
var VideoInput = require('./photobooth');

var History = require('react-router').History;
var Link = require('react-router').Link

module.exports = React.createClass({
	mixins: [History],

	getInitialState: function() {
		var id = this.props.params.id;

		var recruit = this.props.location.state;

		if (recruit && recruit.firstName != null) {
			return {
				autoplay: false,
				showVideo: false,
				edit: true,
				recruit: recruit
			};
		}
		else {
			console.log('initialState', this);
			return {
				autoplay: true,
				showVideo: true,
				countdown: null,
				recruit: {
					comments: null,
					confirmEmail: null,
					contactMe: true,
					email: null,
					exampleCodeSnippet: null,
					fieldOfStudy: null,
					firstName: null,
					fullName: null,
					githubUsername: null,
					gradTerm: null,
					home: null,
					isMale: true,
					lastName: null,
					missionsLocation: null,
					profilePicture: null,
					rating: 0,
					school: null,
					skills: []
				}
			};
		}
	},

	componentDidMount: function() {
		var id = this.props.params.id;

		// if (id) {
		// 	$.get(
		// 	'/api/recruits/' + id,
		// 	function(data){
		// 		this.setState(
		// 			{
		// 				autoplay: false,
		// 				showVideo: false,
		// 				edit: true,
		// 				recruit: data
		// 			}
		// 		);
		// 	}.bind(this));
		// }
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

		var value = targetInput.value;

		var type = targetInput.type;

		if (type == 'checkbox') {
			value = targetInput.checked;
		}
		else if (type == 'radio') {
			value = targetInput.id == 'isMale1';
		}

		var recruit = this.state.recruit;

		recruit[targetInput.name] = value;

		this.setState({recruit: recruit});
	},

	onSubmit: function(event) {
		var instance = this;

		event.preventDefault();

		var config = {
			type: 'POST',
			url: '/api/recruits'
		}

		var successURL = '/success';

		if (this.state.edit) {
			config = {
				type: 'PUT',
				url: '/api/recruits/' + this.state.recruit._id
			}

			successURL = '/admin';
		}

		$.ajax(
			$.extend(
				config,
				{
					data: JSON.stringify(this.state.recruit),
					success: function(response){
						instance.history.pushState(null, successURL, {city: response.data.missionsCity});
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
		var adminToolbar;

		if (this.props.params.id) {
			adminInputs = (
				<div className="admin-only row">
					<h3 className="admin-only">Admin</h3>

					<div className="admin-only form-card">
							<div className="col-md-8">
								<fieldset className="form-group">
									<label for="comments">Comments</label>
									<textarea className="form-control" name="comments" rows="5" placeholder="Admin Comments Here" value={recruit.comments} ></textarea>
								</fieldset>
							</div>

							<div className="col-md-4">
								<fieldset className="form-group">
									<label for="rating">Rating</label>
									<select className="form-control" name="rating" defaultValue={recruit.rating}>
										<option>-</option>
										<option>+</option>
										<option>++</option>
									</select>
								</fieldset>
							</div>
					</div>
				</div>
			);

			adminToolbar = (
				<Link to="/admin">Back to Admin Page </Link>
			);
		}

		var female = 'checked';
		var male = '';

		console.log(recruit);

		if (recruit.isMale) {
			female = '';
			male = 'checked';
		}

		return (
			<div className="container-fluid form-page">
				{adminToolbar}
				<form action="" onSubmit={this.onSubmit} onChange={this.onInputChange}>
					<div className="row">
						<div className="col-md-4">
							<VideoInput recruit={recruit} parent={this} />
						</div>

						<div className="col-md-8">
							<h3 className="personal">Personal</h3>

							<div className="form-card personal">
								<div className="row">
									<div className="col-md-4">
										<fieldset className="row form-group">
											<label for="firstName">First Name</label>
											<small className="text-muted">(Required)</small>
											<input type="text" className="form-control" name="firstName" placeholder="Jim" value={recruit.firstName} />
										</fieldset>
									</div>
									<div className="col-md-4">
										<fieldset className="row form-group">
											<label for="lastName">Last Name</label>
											<small className="text-muted">(Required)</small>
											<input type="text" className="form-control" name="lastName" placeholder="Elliot" value={recruit.lastName} />
										</fieldset>
									</div>

									<fieldset className="col-md-4 form-group">
										<label for="isMale">Gender</label>
										<div class="radio">
											<label className="col-md-6">
												<input type="radio" name="isMale" id="isMale1" defaultChecked={recruit.isMale} defaultValue={recruit.isMale} />
												Male
											</label>
											<label className="col-md-6">
												<input type="radio" name="isMale" id="isMale2" defaultChecked={!recruit.isMale} defaultValue={!recruit.isMale} />
												Female
											</label>
										</div>
									</fieldset>
								</div>

								<div className="row">
									<div className="col-md-4">
										<fieldset className="row form-group">
											<label for="email">Email</label>
											<small className="text-muted">(Required)</small>
											<input type="text" className="form-control" name="email" placeholder="jim.elliot@gmail.com" value={recruit.email} />
										</fieldset>
									</div>
									<div className="col-md-4">
										<fieldset className="row form-group">
											<label for="confirmEmail">Confirm Email</label>
											<small className="text-muted">(Required)</small>
											<input type="text" className="form-control" name="confirmEmail" placeholder="jim.elliot@gmail.com" value={recruit.confirmEmail} />
										</fieldset>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<HomeInput recruit={recruit} parent={this} />
									</div>
									<div className="col-md-6">
										<MissionsInput recruit={recruit} parent={this} />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row secondary-info">
						<div className="col-md-4">
							<h3 className="education">Education</h3>

							<div className="form-card education">
								<fieldset className="row form-group">
									<label for="school">School</label><small className="text-muted">(Only if applicable)</small>
									<input type="text" className="form-control" name="school" placeholder="Wheaton College" value={recruit.school} />
								</fieldset>

								<FieldOfStudyInput recruit={recruit} parent={this} />

								<GradTermInput recruit={recruit} parent={this} />
							</div>
						</div>

						<div className="col-md-4">
							<h3 className="skills-group">Skills</h3>
							
							<div className="form-card skills-group">
								<SkillsInput recruit={recruit} parent={this} />
								<SkillsInput recruit={recruit} parent={this} />
							</div>

							<fieldset className="row form-group contact-me">
								<label className="checkbox-inline">
									<input type="checkbox" className="form-control" name="contactMe" defaultChecked={recruit.contactMe} defaultValue={recruit.contactMe} />
									Contact me about a job.
								</label>
							</fieldset>
						</div>

						<div className="col-md-4">
							<h3 className="elsewhere">Elsewhere</h3>

							<div className="form-card elsewhere">
								<fieldset className="row form-group">
									<label for="githubUsername">Github Username</label>
									<input type="text" className="form-control" name="githubUsername" placeholder="https://github.com/Corge" value={recruit.githubUsername} />
								</fieldset>

								<fieldset className="row form-group">
									<label for="portfolioSite">Portfolio Site</label>
									<input type="text" className="form-control" name="portfolioSite" placeholder="https://myPortfolio.com/" value={recruit.portfolioSite} />
								</fieldset>
							</div>
						</div>
					</div>

					{adminInputs}

					<div className="btn-holder row">
						<button className="btn btn-primary btn-lg" type="submit">Submit</button>
					</div>
				</form>
			</div>
		);
	}
});