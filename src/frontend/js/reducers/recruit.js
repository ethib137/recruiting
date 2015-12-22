module.exports = function(state, action) {
	if (typeof state === 'undefined') {
		return 0;
	}

	if (action.type === 'ADD_RECRUIT') {
		state.push(action.recruit);

		return state;
	} else {
		return state;
	}
}