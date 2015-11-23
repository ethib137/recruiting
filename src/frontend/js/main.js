/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router').Router
var Route = require('react-router').Route

var Form = require('./components/recruit-form.js');
var Admin = require('./components/admin.js');

React.render(
	(
		<Router>
			<Route path="/form" component={Form}/>
			<Route path="/admin" component={Admin}/>
			<Route path="/edit/:id" component={Form}/>
		</Router>
	),
	document.getElementById('mainContent')
);
