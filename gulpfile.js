/*jslint node: true,  nomen: true */
var gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    mocha = require('gulp-mocha');;

/*
 * clean
 */
gulp.task('clean', function () {
    'use strict';
    return gulp.src(['dist/'], {
        read: false
    }).pipe(rimraf());
});
/*
 * JSHint
 */
gulp.task('lint', function () {
    'use strict';
    return gulp.src(['./src/app/**/*.js', './src/test/**/*.js', 'gulpfile.js']).pipe(jshint()).pipe(
        jshint.reporter(stylish));
});

gulp.task('mocha', function () {
    'use strict';
    return gulp.src('src/test/gb-tests.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'nyan'
        }));
});

gulp.task('test', ['lint', 'mocha'], function () {
    'use strict';
    //
});

/**
 * default
 */
gulp.task('default', ['lint', 'mocha'], function () {
    'use strict';
    // default stuff
});