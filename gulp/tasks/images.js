'use strict';

/**
 * Dependencies
 * @type {Gulp|exports}
 */
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    utility = require('../utility'),
    plumber = require('gulp-plumber'),
    gulpif = require('gulp-if'),
    config = require('../config');


// images
gulp.task('images', function () {
    return gulp.src(config.src.images.input)
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(imagemin())
        .pipe(gulpif(config.dev,
            gulp.dest(config.src.images.output),
            gulp.dest(config.src.images.package)
        ));
    //Todo - add notification on build development vs package.
        //.pipe(gulp.dest(config.src.images.output));
});


//gulp.task('favicon', function () {
//    return gulp.src('./src/favicon.ico')
//        .pipe(gulp.dest(config.dest));
//});
