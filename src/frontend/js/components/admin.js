/** @jsx React.DOM */
var React = require('react');

var Recruit = require('./recruit-entity.js');

module.exports = React.createClass({
	contextTypes: {
		store: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			recruits: this.context.store.getState().recruits || [],
			showAll: false
		};
	},

	componentDidMount: function() {
		var instance = this;

		var store = this.context.store;

		store.subscribe(function() {
			var recruits = store.getState().recruits;

			if (recruits.length) {
				instance.setState({recruits: recruits});
			}
		});
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
						<li className={instance.state.showAll ? 'nav-item ' : 'active nav-item'}>
							<a onClick={this.handleNewTab} className="nav-link"><span>New</span></a>
						</li>
						<li className={instance.state.showAll ? 'active nav-item ' : 'nav-item '}>
							<a onClick={this.handleAllTab} className="nav-link"><span>All</span></a>
						</li>
					</ul>

					{search}
				</nav>

				<div className="attendees-container">
					{
						instance.state.recruits.map(
							function(recruit) {
								return <Recruit key={recruit._id} recruit={recruit} showAll={instance.state.showAll} />;
							}
						)
					}
				</div>
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
	}
});