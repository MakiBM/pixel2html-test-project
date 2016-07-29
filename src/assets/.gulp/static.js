'use strict';

var gulp = require('gulp');
var del = require('del');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var plumber = require('gulp-plumber');

var browserSync = require('browser-sync');



var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('clean', function(cb) {
  del([''], cb);
});

gulp.task('main:images', function() {
  return gulp.src('src/assets/images/**/*')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('main:fonts', function() {
  return gulp.src('src/assets/fonts/**/*')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('main:icons', function() {
  return gulp.src('src/assets/icons/**/*')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest('dist/assets/icons'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('main:static', ['main:images', 'main:fonts', 'main:icons']);
