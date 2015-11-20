/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			recruits: [],
			showAll: true
		};
	},

	componentDidMount: function() {
		this.getRecruits();
	},

	handleNewTab: function() {
		this.setState({showAll: false});
	},

	handleAllTab: function() {
		this.setState({showAll: true});
	},

	handleSearchFilter: function(event) {
		var value = event.target.value;

		this.getRecruits(
			{
				term: value
			}
		);
	},

	render: function() {
		var instance = this;

		var search;

		if (instance.state.showAll) {
			search = <input onInput={this.handleSearchFilter} className="form-control pull-right" type="text" placeholder="Search" />
		}

		return (
			<div ref="recruitsContainer" className="recruits-container">
				<nav className="navbar navbar-light bg-faded">
					<ul className="nav navbar-nav">
						<li className={instance.state.showAll ? 'active nav-item ' : 'nav-item '}>
							<a onClick={this.handleAllTab} className="nav-link"><span>All</span></a>
						</li>
						<li className={instance.state.showAll ? 'nav-item ' : 'active nav-item'}>
							<a onClick={this.handleNewTab} className="nav-link"><span>New</span></a>
						</li>
					</ul>

					{search}
				</nav>
				{
				instance.state.recruits.map(
					function(recruit) {
						if (recruit.rating == 0 || instance.state.showAll) {
							var buttonRow = null;

							if (!instance.state.showAll) {
								buttonRow = (
									<div className="text-center">
										<br />
										<button data-id={recruit._id} value="-" onClick={instance.handleRecruitRating} type="button" className="pull-left btn btn-secondary">-</button>
										<button data-id={recruit._id} value="+" onClick={instance.handleRecruitRating} type="button" className="text-center btn btn-secondary">+</button>
										<button data-id={recruit._id} value="++" onClick={instance.handleRecruitRating} type="button" className="pull-right btn btn-secondary">++</button>
									</div>
								);
							}

							return (
								<div className="card" key={recruit._id}>
									<img className="card-img-top" src={recruit.profilePicture} />
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
										{buttonRow}
									</div>
								</div>
							);
						}
						else {
							return null;
						}
					}
				)
				}
			</div>
		);
	},

	handleRecruitRating: function(event) {
		var instance = this;

		var keyId = event.target.getAttribute('data-id');
		var ratingValue = event.target.value;

		$.ajax(
			{
				type: 'PUT',
				url: '/api/recruits/' + keyId,
				success: function(response){
					var recruits = instance.state.recruits;

					var index = indexes = $.map(recruits, function(obj, index) {
						if(obj._id === keyId) {
							return index;
						}
					})

					recruits[index] = response.data;

					instance.setState({recruits: recruits})
				},
				data: JSON.stringify({rating: ratingValue}),
				dataType: 'json',
				contentType : 'application/json'
			}
		);
	},

	getRecruits: function(filter) {
		var instance = this;

		$.ajax(
			{
				type: 'GET',
				url: '/api/recruits',
				success: function(response){
					instance.setState({recruits: response});
				},
				data: filter,
				dataType: 'json',
				contentType : 'application/json'
			}
		);
	}
});