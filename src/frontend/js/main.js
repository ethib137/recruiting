/** @jsx React.DOM */
var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Provider = require('react-redux').Provider;

var Form = require('./components/recruit-form.js');
var Admin = require('./components/admin.js');
var Success = require('./components/success.js');
var Display = require('./components/display.js');

var DisplayStore = require('./redux/display-store');
var FormStore = require('./redux/form-store');

var form = React.createClass({
	render: function() {
		return (
			<Provider store={FormStore} >
				<Form />
			</Provider>
		);
	}
});

var admin = React.createClass({
	render: function() {
		return (
			<Provider store={DisplayStore} >
				<Admin />
			</Provider>
		);
	}
});

var display = React.createClass({
	render: function() {
		return (
			<Provider store={DisplayStore} >
				<Display />
			</Provider>
		);
	}
});

ReactDom.render(
	(
			<Router>
				<Route name="edit" path="/edit/:id" component={form}/>
				<Route name="form" path="/form" component={form}/>

				<Route name="success" path="/success" component={Success}/>

				<Route name="admin" path="/admin" component={admin}/>
				<Route name="display" path="/display" component={display}/>
			</Router>
	),
	document.getElementById('mainContent')
);
