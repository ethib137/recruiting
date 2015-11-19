var gulp = require('gulp');
var server = require('gulp-express');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
	gulp.src('src/frontend/js/main.js')
		.pipe(browserify({transform:'reactify'}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/frontend/js'));
});

gulp.task('copy', function() {
	gulp.src('src/frontend/**/*')
		.pipe(gulp.dest('dist/frontend'));

	gulp.src('src/backend/**/*')
		.pipe(gulp.dest('dist/server'));
});

gulp.task('default',['browserify', 'copy']);

gulp.task('watch', function() {
	gulp.watch('src/frontend/**/*.*', ['default']);
});

gulp.task('start', function() {
	server.run(['dist/server/server.js']);
});