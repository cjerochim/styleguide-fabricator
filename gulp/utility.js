'use strict';

var gutil = require('gulp-util'),
    notify = require('gulp-notify');

module.exports = {
    errorHandler: function(err) {
        gutil.beep();
        notify.onError({
            message: 'Error: <%= error.message %>'
        })(err);

        this.emit('end');
    }
};