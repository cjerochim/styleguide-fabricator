'use strict';

/**
 * Dependencies
 * @type {Gulp|exports}
 */
var gulp = require('gulp'),
	utility = require('../utility'),
	plumber = require('gulp-plumber'),
	gulpif = require('gulp-if'),
	config = require('../config');


// fonts
gulp.task('fonts', function () {
	return gulp.src(config.src.fonts.input)
		.pipe(plumber({ errorHandler: utility.errorHandler }))
		.pipe(gulpif(config.dev,
			gulp.dest(config.src.fonts.output),
			gulp.dest(config.src.fonts.package)
		));
	//Todo - add notification on build development vs package.
	//.pipe(gulp.dest(config.src.fonts.output));
});
