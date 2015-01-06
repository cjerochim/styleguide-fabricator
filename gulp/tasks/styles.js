'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    csso = require('gulp-csso'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    config = require('../config'),
    utility = require('../utility');



// styles
gulp.task('styles:fabricator', function () {
    return gulp.src(config.src.styles.fabricator.input)
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(prefix('last 1 version'))
        .pipe(gulpif(!config.dev, csso()))
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
        .pipe(gulpif(!config.dev, csso()))
        .pipe(gulp.dest(config.src.styles.toolkit.output))
        .pipe(gulpif(config.dev, reload({stream:true})));
});



gulp.task('styles', ['styles:fabricator', 'styles:toolkit']);
