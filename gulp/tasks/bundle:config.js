'use strict';

const gulp = require('gulp');

module.exports = () => {
  gulp.src('./package.json')
      .pipe(gulp.dest('./dist'));
};