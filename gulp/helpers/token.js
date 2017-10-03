'use strict';

const Base64 = require('js-base64').Base64;

const shell = require('./shell');

module.exports.createSecret = function createSecret(name, secret, callback) {
  callback(null, Base64.encode(JSON.stringify(secret)));

  // Todo – replace with token logic once wt-cli#161 gets an answer
  //shell(['node_modules/.bin/wt-cli', 'token', 'create', '--ectx', `${name}=${Base64.encode(JSON.stringify(secret))}`], (err, result) => {
  //  if (err) return callback(err);
  //  callback(null, `token:${name}:${result.trim()}`);
  //});
}