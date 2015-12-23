/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link

module.exports = React.createClass({
	getInitialState: function() {
		return {
			addComment: false,
			recruit: this.props.recruit
		};
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

		var recruit = this.state.recruit;

		$.ajax(
			{
				type: 'PUT',
				url: '/api/recruits/' + recruit._id,
				success: function(response){
					instance.setState(
						{
							addComment: false,
							recruit: response.data
						}
					);
				},
				data: JSON.stringify(recruit),
				dataType: 'json',
				contentType : 'application/json'
			}
		);
	},

	render: function() {
		var recruit = this.state.recruit;

		if (this.state.addComment) {
			return (
				<div className="card">
					<img className="card-img-top" src={recruit.profilePicture} />
					<form action="" className="card-block" onSubmit={this.onSubmit} onChange={this.onInputChange}>
						<fieldset className="form-group">
							<label htmlFor="rating">Rating</label>
							<select className="form-control" name="rating" defaultValue={recruit.rating}>
								<option>-</option>
								<option>+</option>
								<option>++</option>
							</select>
						</fieldset>

						<fieldset className="form-group">
							<label htmlFor="comments">Comments</label>
							<textarea className="form-control" name="comments" rows="5" placeholder="Admin Comments Here" defaultValue={recruit.comments} ></textarea>
							<button className="btn btn-primary" type="submit">Submit</button>
						</fieldset>
					</form>
				</div>
			);
		}
		else if (recruit.rating == 0 || this.props.showAll) {
			var link = '/edit/' + recruit._id;

			var buttonRow = (
				<Link state={recruit} to={link}>Edit Recruit</Link>
			);

			if (!this.props.showAll) {
				buttonRow = (
					<div className="text-center">
						<button data-id={recruit._id} value="-" onClick={this.handleAddComment} type="button" className="pull-left btn btn-secondary">-</button>
						<button data-id={recruit._id} value="+" onClick={this.handleAddComment} type="button" className="text-center btn btn-secondary">+</button>
						<button data-id={recruit._id} value="++" onClick={this.handleAddComment} type="button" className="pull-right btn btn-secondary">++</button>
					</div>
				);
			}

			return (
				<div className="card">
					<div className="img-container">
						<img className="card-img-top" src={recruit.profilePicture} />
					</div>
					<div className="card-block">
						<h4 className="card-title text-center">{recruit.fullName}</h4>

						<div>
							School: <span>{recruit.school}</span>
						</div>

						<div>
							Major: <span>{recruit.fieldOfStudy}</span>
						</div>

						<div>
							<span>{recruit.rating}</span>
						</div>
						<br />
						{buttonRow}
					</div>
				</div>
			);
		}
		else {
			return null;
		}
	},

	handleAddComment: function(event) {
		var recruit = this.state.recruit;

		recruit.rating = event.target.value;

		this.setState(
			{
				addComment: true,
				recruit: recruit
			}
		);
	}
});