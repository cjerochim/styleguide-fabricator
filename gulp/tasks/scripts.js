'use strict';

/**
 * Dependencies.
 * @type {Gulp|exports}
 */
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    source = require('vinyl-source-stream'),
    gulpif = require('gulp-if'),
    concat = require('gulp-concat'),
    bower = require('main-bower-files'),
    browserify = require('browserify'),
    header = require('gulp-header'),
    config = require('../config'),
    utility = require('../utility'),
    pkg = require('../../package.json');



// scripts
gulp.task('scripts:fabricator', function () {
    return gulp.src(config.src.scripts.fabricator.input)
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(concat(config.src.scripts.fabricator.fileName))
        .pipe(header(config.banner, {pkg: pkg} ))
        .pipe(gulp.dest(config.src.scripts.fabricator.output));
});

gulp.task('scripts:toolkit', function () {
    return browserify(config.src.scripts.toolkit.input).bundle()
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(source(config.src.scripts.toolkit.fileName))
        .pipe(header(config.banner, {pkg: pkg} ))
        .pipe(gulpif(config.dev,
            //Output to development
            gulp.dest(config.src.scripts.toolkit.output),
            //Output to package
            gulp.dest(config.src.scripts.toolkit.package)
        ));

        //.pipe(gulp.dest(config.src.scripts.toolkit.output));
    //Todo - add notifications with conditionals for prod vs package
});

/**
 *  Note - To define what bower files need to be copied over review the bower.json under overrides.
 **/
gulp.task('scripts:bower', function() {
    return gulp.src(bower(), { base: config.src.scripts.bower.input })
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(gulpif(config.dev,
            //Output to development
            gulp.dest(config.src.scripts.bower.output),
            //Output to package
            gulp.dest(config.src.scripts.bower.package)
        ));
        //.pipe(gulp.dest(config.src.scripts.bower.output));
        //Todo - Add notifications for prod vs package.
});

gulp.task('scripts', ['scripts:fabricator', 'scripts:toolkit', 'scripts:bower']);