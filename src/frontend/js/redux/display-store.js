var io = require('socket.io-client');
var Redux = require('redux');

var DisplayReducer = require('./display-reducer.js');

var createStore = Redux.createStore;

var store = createStore(DisplayReducer);

module.exports = store;

var socket = io();

var addRecruit = require('./actions/add-recruit');
var initialRecruits = require('./actions/initial-recruits');

socket.on('newRecruit', function(recruitObj) {
	store.dispatch(addRecruit(recruitObj));
});

socket.on('initialRecruits', function(recruitsArray) {
	store.dispatch(initialRecruits(recruitsArray));
});