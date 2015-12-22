/** @jsx React.DOM */
var React = require('react');

var setRecruit = require('../redux/actions/set-recruit');

module.exports = React.createClass({
	contextTypes: {
		store: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			autoplay: true,
			showVideo: true,
			countdown: null,
			recruit: this.context.store.getState()
		}
	},

	componentDidMount: function() {
		var recruit = this.state.recruit;

		if (!recruit._id) {
			this.canvasNode = this.refs.imageCanvas;
			var videoDisplay = this.refs.webcamDisplay;

			this.videoDisplay = videoDisplay;

			var videoObj = {"video": true};

			var errBack = function(error) {
				console.log('Video capture error: ', error.code);
			};

			if(navigator.getUserMedia) { // Standard
				navigator.getUserMedia(videoObj, function(stream) {
					videoDisplay.src = stream;
					videoDisplay.play();
				}, errBack);
			} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
				navigator.webkitGetUserMedia(videoObj, function(stream){
					videoDisplay.src = window.URL.createObjectURL(stream);
					videoDisplay.play();
				}, errBack);
			}
			else if(navigator.mozGetUserMedia) { // Firefox-prefixed
				navigator.mozGetUserMedia(videoObj, function(stream){
					videoDisplay.src = window.URL.createObjectURL(stream);
					videoDisplay.play();
				}, errBack);
			}
		}
	},

	componentDidUpdate: function() {
		var recruit = this.state.recruit;

		this.context.store.dispatch(setRecruit(recruit));
	},

	takePhoto: function() {
		var instance = this;

		var context = this.canvasNode.getContext('2d');

		context.drawImage(this.videoDisplay, 0, 0, 320, 240);

		var imageData = this.canvasNode.toDataURL('image/jpeg');

		this.refs.imageDataInput.value = imageData;

		var recruit = instance.state.recruit;

		recruit.profilePicture = imageData;

		instance.setState({recruit: recruit});

		this.setState({showVideo: false});
	},

	handleSnapPhoto: function() {
		var instance = this;

		var countdownNode = this.refs.photoCountdown;

		instance.setState({countdown: 3});

		var interval = setInterval(
			function() {
				var newVal = instance.state.countdown - 1;

				if (newVal === 0) {
					newVal = 'Snap!'

					clearInterval(this);
				}

				instance.setState({countdown: newVal});
			},
			1000
		);

		setTimeout(
			function() {
				clearInterval(interval);

				instance.takePhoto();
			},
			3000
		);
	},

	render: function() {
		var recruit = this.state.recruit;

		if (recruit._id) {
			return (
				<div className="img-container">
					<img className="card-img-top" src={recruit.profilePicture} />
				</div>
			);
		}
		else {
			var videoDisplay = false;

			if (this.state.showVideo) {
				videoDisplay = (
					<div>
						<video ref="webcamDisplay" width="320" height="240" autoPlay={this.state.autoplay} src={recruit.profilePicture}></video>
						<div className="photo-countdown" ref="photoCountdown">{this.state.countdown}</div>
					</div>
				);
			}

			return (
				<fieldset className="form-group photo-booth">
					<div className="video-container">
						{videoDisplay}
						<canvas ref="imageCanvas" hidden={this.state.showVideo} width="320" height="240"></canvas>
					</div>

					<label htmlFor="profilePicture">Take a picture so we can remember you!</label>
					<input ref="imageDataInput" type="hidden" name="profilePicture" />

					<div className="">
						<input ref="snapPhoto" className="btn btn-secondary" onClick={this.handleSnapPhoto} type="button" defaultValue="Snap Photo" />
					</div>
				</fieldset>
			);
		}
	}
});