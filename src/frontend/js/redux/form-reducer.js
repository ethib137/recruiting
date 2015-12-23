module.exports = function(state, action) {
	if (typeof state === 'undefined' || action.type === 'CLEAR_STORE') {
		return {
			comments: null,
			confirmEmail: null,
			contactMe: true,
			email: null,
			exampleCodeSnippet: null,
			fieldOfStudy: null,
			firstName: null,
			fullName: null,
			githubUsername: null,
			gradTerm: null,
			home: null,
			isMale: true,
			lastName: null,
			missionsLocation: null,
			portfolioSite: null,
			profilePicture: null,
			rating: 0,
			school: null,
			skills: [],
			spokenLanguages: []
		};
	}

	if (action.type === 'SET_RECRUIT') {
		return Object.assign({}, state, action.recruit);
	}
	else {
		return state;
	}
}