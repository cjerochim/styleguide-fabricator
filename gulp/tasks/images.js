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
gulp.task('images', function () {
    return gulp.src(config.src.images.input)
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(imagemin())
        .pipe(gulp.dest(config.src.images.output));
});


//gulp.task('favicon', function () {
//    return gulp.src('./src/favicon.ico')
//        .pipe(gulp.dest(config.dest));
//});
