var Redux = require('redux');

var FormReducer = require('./form-reducer.js');

var createStore = Redux.createStore;

var store = createStore(FormReducer);

module.exports = store;