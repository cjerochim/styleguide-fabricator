'use strict';

/**
 * Dependencies
 * @type {Gulp|exports}
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    gulpif = require('gulp-if'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    header = require('gulp-header'),
    config = require('../config'),
    utility = require('../utility'),
    pkg = require('../../package.json');



// styles
gulp.task('styles:fabricator', function () {
    return gulp.src(config.src.styles.fabricator.input)
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(prefix('last 1 version'))
        .pipe(gulp.dest(config.src.styles.fabricator.output))
        .pipe(gulpif(config.dev, reload({stream:true})));
});

gulp.task('styles:toolkit', function () {
    return gulp.src(config.src.styles.toolkit.input)
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(prefix('last 1 version'))
        .pipe(header(config.banner, {pkg: pkg} ))
        .pipe(gulpif(config.dev,
            //Development output
            gulp.dest(config.src.styles.toolkit.output),
            //Production output.
            gulp.dest(config.src.styles.toolkit.package)
        ))
        .pipe(gulpif(config.dev, reload({stream:true})));
});



gulp.task('styles', ['styles:fabricator', 'styles:toolkit']);
