'use strict';


/**
 * Dependencies
 * @type {Gulp|exports}
 */
var gulp = require('gulp'),
    collate = require('./collate'),
    compile = require('./compile'),
    Q = require('q'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    config = require('../config');





// collate
gulp.task('collate', function () {

    // 'collate' is a little different -
    // it returns a promise instead of a stream

    var deferred = Q.defer();

    var opts = {
        materials: config.src.materials,
        dest: config.dest + '/fabricator/data/data.json'
    };

    // run the collate task; resolve deferred when complete
    collate(opts, deferred.resolve);

    return deferred.promise;

});



// assembly
gulp.task('assemble:fabricator', function () {
    var opts = {
        data: config.dest + '/fabricator/data/data.json',
        template: false
    };

    return gulp.src(config.src.views)
        .pipe(compile(opts))
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify({
            title: 'Assemble:Fabricator',
            message: '✔ Components,Structures are complete.',
            onLast: true
        }))
});

gulp.task('assemble:templates', function () {
    var opts = {
        data: config.dest + '/fabricator/data/data.json',
        template: true
    };

    return gulp.src('./src/toolkit/templates/*.hbs')
        .pipe(compile(opts))
        .pipe(rename({
            prefix: 'template-',
            extname: '.html'
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify({
            title: 'Assemble:Templates',
            message: '✔ Templates are complete.',
            onLast: true
        }))

});





gulp.task('assemble', ['collate'], function () {
    gulp.start('assemble:fabricator', 'assemble:templates');
});

