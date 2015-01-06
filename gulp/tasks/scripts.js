'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    source = require('vinyl-source-stream'),
    gulpif = require('gulp-if'),
    concat = require('gulp-concat'),
    bower = require('main-bower-files'),
    browserify = require('browserify'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    config = require('../config'),
    utility = require('../utility');


// scripts
gulp.task('scripts:fabricator', function () {
    return gulp.src(config.src.scripts.fabricator.input)
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(concat(config.src.scripts.fabricator.fileName))
        .pipe(gulpif(!config.dev, uglify()))
        .pipe(gulp.dest(config.src.scripts.fabricator.output));
});


gulp.task('scripts:toolkit', function () {
    return browserify(config.src.scripts.toolkit.input).bundle()
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(source(config.src.scripts.toolkit.fileName))
        .pipe(gulpif(!config.dev, streamify(uglify())))
        .pipe(gulp.dest(config.src.scripts.toolkit.output));
});


/**
 *  Note - To define what bower files need to be copied over review the bower.json under overrides.
 **/
gulp.task('scripts:bower', function() {
    return gulp.src(bower(), { base: config.src.scripts.bower.input })
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(gulp.dest(config.src.scripts.bower.output));
});

gulp.task('scripts', ['scripts:fabricator', 'scripts:toolkit', 'scripts:bower']);