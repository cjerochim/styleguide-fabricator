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


// vendors
gulp.task('vendors', function () {
	return gulp.src(config.src.vendors.input)
		.pipe(plumber({ errorHandler: utility.errorHandler }))
		.pipe(gulpif(config.dev,
			gulp.dest(config.src.vendors.output),
			gulp.dest(config.src.vendors.package)
		));
	//Todo - add notification on build development vs package.
	//.pipe(gulp.dest(config.src.vendors.output));
});
