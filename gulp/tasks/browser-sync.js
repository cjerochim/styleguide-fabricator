'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../config');


/**
 * Initiate browser sync
 */
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: config.dest
        },
        notify: true
    });
});


gulp.task('host', ['browser-sync'], function() {
    gulp.watch('src/toolkit/{components,structures,layouts,templates,documentation,views}/**/*.{hbs,md}', ['assemble']);
    gulp.watch('src/toolkit/assets/styles/**/*.scss', ['styles']);
    gulp.watch('src/toolkit/assets/scripts/**/*.js', ['scripts']);
});