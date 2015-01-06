'use strict';


/**
 * Dependencies
 * @type {Gulp|exports}
 */
var gulp = require('gulp'),
    del = require('del'),
    config = require('../config');


// clean
gulp.task('clean:dev', function (cb) {
    del([config.clean.dev], cb);
});

gulp.task('clean:package', function(cb) {
    del([config.clean.package], cb)
});
