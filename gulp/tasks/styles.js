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
    return gulp.src(config.src.styles.fabricator)
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(prefix('last 1 version'))
        .pipe(gulpif(!config.dev, csso()))
        .pipe(rename('f.css'))
        .pipe(gulp.dest(config.dest + '/fabricator/styles'))
        .pipe(gulpif(config.dev, reload({stream:true})));
});

gulp.task('styles:toolkit', function () {
    return gulp.src(config.src.styles.toolkit)
        .pipe(plumber({ errorHandler: utility.errorHandler }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(prefix('last 1 version'))
        .pipe(gulpif(!config.dev, csso()))
        .pipe(gulp.dest(config.dest + '/toolkit/styles'))
        .pipe(gulpif(config.dev, reload({stream:true})));
});



gulp.task('styles', ['styles:fabricator', 'styles:toolkit']);
