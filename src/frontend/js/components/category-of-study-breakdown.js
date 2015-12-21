/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			categories: []
		};
	},

	componentDidMount: function() {
		this.getGenders();
	},

	getGenders: function() {
		var instance = this;

		$.ajax(
			{
				type: 'GET',
				url: '/api/recruits',
				success: function(response){
					var categoryObj = {};

					response.forEach(function(item) {
						var category = item.categoryOfStudy;

						if (category) {
							var categoryInObj = categoryObj[category];

							if (categoryInObj) {
								categoryInObj += 1;
							}
							else {
								categoryInObj = 1;
							}

							categoryObj[category] = categoryInObj;
						}
					});

					var categoryArr = [];

					$.each(categoryObj, function(key, val) {
						categoryArr.push([key, val]);
					})

					categoryArr.sort(function(a, b) {
						return b[1] - a[1];
					});

					instance.setState({categories: categoryArr.slice(0, 8)});
				},
				data: {
					delta: 0
				},
				dataType: 'json',
				contentType : 'application/json'
			}
		);
	},

	render: function() {
		var instance = this;

		var categories = instance.state.categories;

		var topCategory = categories[0];
		var maxNum = 0;

		if (topCategory) {
			maxNum = topCategory[1];
		}

		return (
			<div className="statistics study-breakdown">
				<div>Study Breakdown:</div>

				<div ref="attendeeBreakDown">
					{
						categories.map(
							function(category, index) {
								var width = (category[1] / maxNum * 100) + '%';

								var style = {
									height: '24px',
									width: width,
								};

								return (
									<div className="bar-container" style={style}>
										<div className="bar">
											{category[0]}
										</div>
										<span className="total">
											{category[1] > 1000 ? '1000+' : category[1]}
										</span>
									</div>
								);
							}
						)
					}
				</div>
			</div>
		);
	}
});