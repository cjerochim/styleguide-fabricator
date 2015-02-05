'use strict';

//Run deploy scripts.

var gulp = require('gulp'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version'),
    config = require('../config');


/**
 * Update package versions
 * @param importance
 * @returns {*}
 */
function inc(importance) {
    if(typeof importance === 'undefined') throw 'Require a defined importance';
    // get all the files to bump version in.
    return gulp.src(['./package.json', './bower.json'])
        // bump the version number in those files
        .pipe(bump({type: importance}))
        //save it back to the filesystem
        .pipe(gulp.dest('./'))
        // commit the changed version number
        .pipe(git.commit('bumps package version'))
        // read only one file to get the version number
        .pipe(filter('package.json'))
        // **tag it in the repository**
        .pipe(tag_version());
}



/**
 * Push to github
 */
gulp.task('deploy:push', function(){
    //Delay before push to ensure tagging has occured.
    setTimeout(function() {
        git.push(config.release.stream, config.release.branch, {args: " --tags"}, function (err) {
            if (err) throw err;
        });
    }, 500);
});

gulp.task('deploy:bump:patch', function() {
    return inc('patch');
});

gulp.task('deploy:bump:minor', function() {
    return inc('minor');
});

gulp.task('deploy:bump:release', function() {
    return inc('release');
});


gulp.task('deploy:patch', ['deploy:bump:patch', 'deploy:push']);
gulp.task('deploy:minor', ['deploy:bump:minor', 'deploy:push']);
gulp.task('deploy:release', ['deploy:bump:release', 'deploy:push']);
