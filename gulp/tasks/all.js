'use strict';

const runSequence = require('run-sequence');

module.exports = (callback) => {
  runSequence(['bundle', 'configure', 'deploy'], callback);
}