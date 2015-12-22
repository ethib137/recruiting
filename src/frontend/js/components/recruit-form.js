/** @jsx React.DOM */
var React = require('react');

var HomeInput = require('./home-input');
var MissionsInput = require('./country-input');
var FieldOfStudyInput = require('./field-of-study');
var GradTermInput = require('./grad-date');
var SkillsInput = require('./skills-input');
var VideoInput = require('./photobooth');

var History = require('react-router').History;
var Link = require('react-router').Link;

var setRecruit = require('../redux/actions/set-recruit');

module.exports = React.createClass({
	mixins: [History],
	contextTypes: {
		store: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			recruit: this.context.store.getState()
		}
	},

	componentDidUpdate: function() {
		var recruit = this.state.recruit;

		this.context.store.dispatch(setRecruit(recruit));
	},

	onInputChange: function(event) {
		var targetInput = event.target;

		var value = targetInput.value;

		var type = targetInput.type;

		if (type == 'checkbox') {
			value = targetInput.checked;
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
						instance.history.pushState(null, successURL, {city: response.data.missionsLocation});
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

		if (this.props.params && this.props.params.id) {
			adminInputs = (
				<div className="admin-only row">
					<h3 className="admin-only">Admin</h3>

					<div className="admin-only form-card">
							<div className="col-md-8">
								<fieldset className="form-group">
									<label htmlFor="comments">Comments</label>
									<textarea className="form-control" name="comments" rows="5" placeholder="Admin Comments Here" value={recruit.comments} ></textarea>
								</fieldset>
							</div>

							<div className="col-md-4">
								<fieldset className="form-group">
									<label htmlFor="rating">Rating</label>
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

		return (
			<div className="container-fluid form-page">
				{adminToolbar}
				<form action="" onSubmit={this.onSubmit} onChange={this.onInputChange}>
					<div className="row">
						<div className="col-md-4">
							<VideoInput />
						</div>

						<div className="col-md-8">
							<h3 className="personal">Personal</h3>

							<div className="form-card personal">
								<div className="row">
									<div className="col-md-4">
										<fieldset className="row form-group">
											<label htmlFor="firstName">First Name</label>
											<small className="text-muted">(Required)</small>
											<input type="text" className="form-control" name="firstName" placeholder="Jim" value={recruit.firstName} />
										</fieldset>
									</div>
									<div className="col-md-4">
										<fieldset className="row form-group">
											<label htmlFor="lastName">Last Name</label>
											<small className="text-muted">(Required)</small>
											<input type="text" className="form-control" name="lastName" placeholder="Elliot" value={recruit.lastName} />
										</fieldset>
									</div>

									<fieldset className="col-md-4 form-group">
										<label htmlFor="isMale">Gender</label>
										<div className="radio">
											<label className="col-md-6">
												<input type="radio" name="isMale" id="isMale1" defaultChecked={recruit.isMale} value="true" />
												Male
											</label>
											<label className="col-md-6">
												<input type="radio" name="isMale" id="isMale2" defaultChecked={!recruit.isMale} value="false" />
												Female
											</label>
										</div>
									</fieldset>
								</div>

								<div className="row">
									<div className="col-md-4">
										<fieldset className="row form-group">
											<label htmlFor="email">Email</label>
											<small className="text-muted">(Required)</small>
											<input type="text" className="form-control" name="email" placeholder="jim.elliot@gmail.com" value={recruit.email} />
										</fieldset>
									</div>
									<div className="col-md-4">
										<fieldset className="row form-group">
											<label htmlFor="confirmEmail">Confirm Email</label>
											<small className="text-muted">(Required)</small>
											<input type="text" className="form-control" name="confirmEmail" placeholder="jim.elliot@gmail.com" value={recruit.confirmEmail} />
										</fieldset>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<HomeInput />
									</div>
									<div className="col-md-6">
										<MissionsInput />
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
									<label htmlFor="school">School</label><small className="text-muted">(Only if applicable)</small>
									<input type="text" className="form-control" name="school" placeholder="Wheaton College" value={recruit.school} />
								</fieldset>

								<FieldOfStudyInput />

								<GradTermInput />
							</div>
						</div>

						<div className="col-md-4">
							<h3 className="skills-group">Skills</h3>

							<div className="form-card skills-group">
								<SkillsInput />
								<SkillsInput />
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
									<label htmlFor="githubUsername">Github Username</label>
									<input type="text" className="form-control" name="githubUsername" placeholder="https://github.com/Corge" value={recruit.githubUsername} />
								</fieldset>

								<fieldset className="row form-group">
									<label htmlFor="portfolioSite">Portfolio Site</label>
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