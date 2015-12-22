/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router').Router
var Route = require('react-router').Route

var Provider = require('react-redux').Provider;


var Form = require('./components/recruit-form.js');
var Admin = require('./components/admin.js');
var Success = require('./components/success.js');
var Display = require('./components/display.js');

var Store = require('./store/recruits');

React.render(
	(
		<Provider store={Store} >
			<Router>
				<Route name="form" path="/form" component={Form}/>
				<Route name="admin" path="/admin" component={Admin}/>
				<Route name="edit" path="/edit/:id" component={Form}/>
				<Route name="success" path="/success" component={Success}/>
				<Route name="display" path="/display" component={Display}/>
			</Router>
		</Provider>
	),
	document.getElementById('mainContent')
);
