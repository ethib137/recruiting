module.exports = function(state, action) {
	if (typeof state === 'undefined') {
		return [];
	}

	if (action.type === 'ADD_RECRUIT') {
		state.push(action.recruit);

		return state;
	} else if (action.type === 'INITIAL_RECRUITS') {
		state = action.recruits;

		return state;
	} else {
		return state;
	}
}