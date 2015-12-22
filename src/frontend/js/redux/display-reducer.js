module.exports = function(state, action) {
	if (typeof state === 'undefined') {
		return {
			recruits: [],
			newestRecruit: null
		};
	}

	if (action.type === 'ADD_RECRUIT') {
		state.newestRecruit = action.recruit;
		state.recruits.push(action.recruit);

		return state;
	} else if (action.type === 'INITIAL_RECRUITS') {
		state.recruits = action.recruits;

		return state;
	} else {
		return state;
	}
}