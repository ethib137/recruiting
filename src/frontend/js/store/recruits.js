var Redux = require('redux');

var RecruitReducer = require('../reducers/recruit.js');

var createStore = Redux.createStore;

var store = createStore(RecruitReducer);

module.exports = store;