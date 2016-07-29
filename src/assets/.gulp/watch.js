'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {

  //static files
  gulp.watch('src/*.html', ['main:html']);
  gulp.watch('src/assets/images/**/*', ['main:images']);
  gulp.watch('src/assets/fonts/**/*', ['main:fonts']);
  gulp.watch('src/assets/icons/**/*', ['main:icons']);

  //scripts
  gulp.watch('src/assets/js/**/*.js', ['main:scripts']);

  //styles
  gulp.watch([
    'src/assets/styles/**/*.scss',
    '!src/assets/styles/vendor/**/*',
  ], ['main:styles']);


  


});
