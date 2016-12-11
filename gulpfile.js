const gulp = require('gulp')
const ts = require('gulp-typescript')
const mocha = require('gulp-mocha');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json')

gulp.task('transpile', () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('test', ['transpile'], () => {
  const test = gulp.src(['dist/test/**/*.test.js'], {
    read: false
  }).pipe(mocha({
    reporter: 'spec'
  }));
  return test;
});

gulp.task('watch', ['test'], () => {
  gulp.watch('src/**/*.ts', ['test'])
});

gulp.task('default', ['watch'])
