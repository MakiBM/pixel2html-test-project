'use strict';


var gulp = require('gulp');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');


var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('main:scripts', function() {
  var b = browserify({
    entries: './src/assets/js/entry.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(plumber({errorHandler:onError}))
    // turn it off for nowas of errors coming from browserify
    // TODO: update jshint to remove false positives
    // .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(sourcemaps.init({loadMpas:true}))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({stream:true}));
});
