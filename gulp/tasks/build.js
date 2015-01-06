'use strict';

var gulp = require('gulp');


// build
gulp.task('build', ['clean'], function () {
    gulp.start('styles', 'scripts', 'images', 'assemble');
});