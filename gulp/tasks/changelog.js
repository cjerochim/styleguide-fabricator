'use strict';


/**
 * Dependencies
 * @type {Gulp|exports}
 */
var gulp = require('gulp'),
    shell = require('gulp-shell'),
    argv = require('yargs').argv;


/**
 * Run a changelog with all the below required parameters.
 * --from <start version> e.g. v0.0.1
 * --to <end version> e.g. v0.0.14
 */
gulp.task('changelog', function(){
    if(typeof argv.from === 'undefined' || typeof argv.to === 'undefined') {
        console.log('Be less shit, use --from and --to');
        return;
    }
    var _from = argv.from,
        _to = argv.to,
        _location = (argv.package !== 'true')? './package/' : '',
        _command = 'git whatchanged ' + _from + '..' +  _to + ' > ./' + _location + '/CHANGELOG.txt';
    return gulp.src('')
        .pipe(shell([_command]));
});