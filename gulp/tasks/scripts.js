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
    return gulp.src(config.src.scripts.fabricator)
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(concat('f.js'))
        .pipe(gulpif(!config.dev, uglify()))
        .pipe(gulp.dest(config.dest + '/fabricator/scripts'));
});


gulp.task('scripts:toolkit', function () {
    return browserify(config.src.scripts.toolkit).bundle()
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(source('toolkit.js'))
        .pipe(gulpif(!config.dev, streamify(uglify())))
        .pipe(gulp.dest(config.dest + '/toolkit/scripts'));
});


/**
 *  Note - To define what bower files need to be copied over review the bower.json under overrides.
 **/
gulp.task('scripts:bower', function() {
    return gulp.src(bower(), { base: config.src.scripts.bower})
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(gulp.dest(config.dest + '/toolkit/lib'));
});




gulp.task('scripts', ['scripts:fabricator', 'scripts:toolkit', 'scripts:bower']);