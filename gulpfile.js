'use strict';


var requireDirectory = require('require-dir');

requireDirectory('./gulp/tasks/', { recurse: true });



//// modules
//var browserify = require('browserify');
//var browserSync = require('browser-sync');
////var collate = require('./gulp/tasks/collate');
////var compile = require('./gulp/tasks/compile');
//var concat = require('gulp-concat');
//var csso = require('gulp-csso');
//var del = require('del');
//var gulp = require('gulp');
//var gulpif = require('gulp-if');
//var imagemin = require('gulp-imagemin');
//var plumber = require('gulp-plumber');
//var prefix = require('gulp-autoprefixer');
//var Q = require('q');
//var rename = require('gulp-rename');
//var reload = browserSync.reload;
//var sass = require('gulp-sass');
//var source = require('vinyl-source-stream');
//var streamify = require('gulp-streamify');
//var uglify = require('gulp-uglify');
//var bower = require('main-bower-files');
//var config = require('./gulp/config');

//
//// clean
//gulp.task('clean', function (cb) {
//	del([config.dest], cb);
//});
//
//


//
//// scripts
//gulp.task('scripts:fabricator', function () {
//	return gulp.src(config.src.scripts.fabricator)
//		.pipe(plumber())
//		.pipe(concat('f.js'))
//		.pipe(gulpif(!config.dev, uglify()))
//		.pipe(gulp.dest(config.dest + '/fabricator/scripts'));
//});
//
//gulp.task('scripts:toolkit', function () {
//	return browserify(config.src.scripts.toolkit).bundle()
//		.pipe(plumber())
//		.pipe(source('toolkit.js'))
//		.pipe(gulpif(!config.dev, streamify(uglify())))
//		.pipe(gulp.dest(config.dest + '/toolkit/scripts'));
//});




///**
// *  Note - To define what bower files need to be copied over review the bower.json under overrides.
// **/
//gulp.task('scripts:bower', function() {
//	return gulp.src(bower(), { base: config.src.scripts.bower})
//		.pipe(gulp.dest(config.dest + '/toolkit/lib'));
//});


//gulp.task('scripts', ['scripts:fabricator', 'scripts:toolkit', 'scripts:bower']);

//
//// images
//gulp.task('images', ['favicon'], function () {
//	return gulp.src(config.src.images)
//		.pipe(imagemin())
//		.pipe(gulp.dest(config.dest + '/toolkit/images'));
//});
//
//gulp.task('favicon', function () {
//	return gulp.src('./src/favicon.ico')
//		.pipe(gulp.dest(config.dest));
//});


//// collate
//gulp.task('collate', function () {
//
//	// 'collate' is a little different -
//	// it returns a promise instead of a stream
//
//	var deferred = Q.defer();
//
//	var opts = {
//		materials: config.src.materials,
//		dest: config.dest + '/fabricator/data/data.json'
//	};
//
//	// run the collate task; resolve deferred when complete
//	collate(opts, deferred.resolve);
//
//	return deferred.promise;
//
//});
//
//// assembly
//gulp.task('assemble:fabricator', function () {
//	var opts = {
//		data: config.dest + '/fabricator/data/data.json',
//		template: false
//	};
//
//	return gulp.src(config.src.views)
//		.pipe(compile(opts))
//		.pipe(rename({
//			extname: '.html'
//		}))
//		.pipe(gulp.dest(config.dest));
//});
//
//gulp.task('assemble:templates', function () {
//	var opts = {
//		data: config.dest + '/fabricator/data/data.json',
//		template: true
//	};
//
//	return gulp.src('./src/toolkit/templates/*.hbs')
//		.pipe(compile(opts))
//		.pipe(rename({
//			prefix: 'template-',
//			extname: '.html'
//		}))
//		.pipe(gulp.dest(config.dest));
//});
//
//
//gulp.task('assemble', ['collate'], function () {
//	gulp.start('assemble:fabricator', 'assemble:templates');
//});





// build
//gulp.task('build', ['clean'], function () {
//	gulp.start('styles', 'scripts', 'images', 'assemble');
//});

//
////Todo - review browser sync - not working.
//// server
//gulp.task('browser-sync', function () {
//	browserSync({
//		server: {
//			baseDir: config.dest
//		},
//		notify: false
//	});
//});
//
//
//// watch
//gulp.task('watch', ['browser-sync'], function () {
//	gulp.watch('src/toolkit/{components,structures,templates,documentation,views}/**/*.{hbs,md}', ['assemble', browserSync.reload]);
//	gulp.watch('src/fabricator/styles/**/*.scss', ['styles:fabricator']);
//	gulp.watch('src/toolkit/assets/styles/**/*.scss', ['styles:toolkit']);
//	gulp.watch('src/fabricator/scripts/**/*.js', ['scripts:fabricator', browserSync.reload]);
//	gulp.watch('src/toolkit/assets/scripts/**/*.js', ['scripts:toolkit', browserSync.reload]);
//	gulp.watch(config.src.images, ['images', browserSync.reload]);
//});
//
//
//// development environment
//gulp.task('dev', ['build'], function () {
//	gulp.start('watch');
//});
//
//
//// default build task
//gulp.task('default', function () {
//	config.dev = false;
//	gulp.start('build');
//});
