'use strict';

/**
 * Dependencies
 * @type {Gulp|exports}
 */
var gulp = require('gulp'),
    config = require('../config');



// build
gulp.task('build', ['clean:dev'], function () {
    config.dev = true;
    gulp.start('styles', 'scripts', 'fonts', 'images', 'vendors', 'assemble');
});

// Generate package
gulp.task('package', ['clean:package'], function () {
    config.dev = false;
    gulp.start('styles', 'scripts', 'fonts', 'images', 'vendors');
});

