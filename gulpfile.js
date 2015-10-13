/*jslint node: true,  nomen: true */
var gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha');

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
 * ESLint
 */
 gulp.task('lint', function () {
     return gulp.src(['*.js', 'src/**/*.js'])
         // eslint() attaches the lint output to the eslint property
         // of the file object so it can be used by other modules.
         .pipe(eslint())
         // eslint.format() outputs the lint results to the console.
         // Alternatively use eslint.formatEach() (see Docs).
         .pipe(eslint.format())
         // To have the process exit with an error code (1) on
         // lint error, return the stream and pipe to failAfterError last.
         .pipe(eslint.failAfterError());
 });

gulp.task('mocha', function () {
    'use strict';
    return gulp.src('src/test/gb-tests.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec'
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
