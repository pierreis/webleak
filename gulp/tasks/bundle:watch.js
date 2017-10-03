'use strict';

const gulp = require('gulp');

module.exports = () => {
  gulp.watch('./src/**/*.js', ['bundle']);
};