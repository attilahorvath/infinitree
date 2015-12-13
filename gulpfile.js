'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const del = require('del');

gulp.task('clean', () => {
  return del(['lib', 'dist']);
});

gulp.task('compile', ['clean'], () => {
  return gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('lib'));
});

gulp.task('browserify', ['compile'], () => {
  return browserify('lib/infinitree.js')
  .bundle()
  .pipe(source('infinitree.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['browserify']);
