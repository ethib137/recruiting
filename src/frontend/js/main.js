/** @jsx React.DOM */
var React = require('react');

// Not ideal to use createFactory, but don't know how to use JSX to solve this
// Posted question at: https://gist.github.com/sebmarkbage/ae327f2eda03bf165261
var Form = require('./components/recruit-form.js');

React.render(
	<Form />,

	document.getElementById('mainContent')
);
