'use strict';

const exec = require('child_process').exec;
const se = require('shell-escape');

module.exports = function (command, cb) {
  const escaped = se(command);
  exec(escaped, (err, stdout, stderr) => {
    if (err) return cb(err);
    if (stderr) return cb(new Error(stderr));
    cb(stdout);
  });
}