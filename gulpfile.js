'use strict';

var gulp = require('gulp');

gulp.task('all', require('gulp/tasks/all'));

gulp.task('bundle', require('gulp/tasks/bundle'));
gulp.task('bundle:config', require('gulp/tasks/bundle:config'));
gulp.task('bundle:webtasks', require('gulp/tasks/bundle:webtasks'));
gulp.task('bundle:watch', require('gulp/tasks/bundle:watch'));

gulp.task('configure', require('gulp/tasks/configure'));
gulp.task('configure:accounts', require('gulp/tasks/configure:accounts'));
gulp.task('configure:trigger', require('gulp/tasks/configure:trigger'));
gulp.task('configure:twitter', require('gulp/tasks/configure:twitter'));
gulp.task('configure:notify', require('gulp/tasks/configure:notify'));
gulp.task('configure:twilio', require('gulp/tasks/configure:twilio'));
gulp.task('configure:webtask', require('gulp/tasks/configure:webtask'));

gulp.task('deploy', require('gulp/tasks/deploy'));
gulp.task('undeploy', require('gulp/tasks/undeploy'));