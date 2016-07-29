'use strict';

var gulp = require('gulp');


var defaultGulp = [
  'main:html',
  'main:static',
  'main:styles',
  'main:scripts',
  
  
];

gulp.task('default', defaultGulp);
