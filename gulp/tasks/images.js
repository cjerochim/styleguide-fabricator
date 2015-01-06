'use strict';

/**
 * Dependencies
 * @type {Gulp|exports}
 */
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    utility = require('../utility'),
    plumber = require('gulp-plumber'),
    config = require('../config');


// images
gulp.task('images', ['favicon'], function () {
    return gulp.src(config.src.images)
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(imagemin())
        .pipe(gulp.dest(config.dest + '/toolkit/images'));
});



gulp.task('favicon', function () {
    return gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.dest));
});
