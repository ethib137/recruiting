module.exports = function(router) {
	router.route('/')
		.get(
			function(req,res) {
				res.sendFile(path.join(__dirname, '../frontend/index.html'));
			}
		);
}