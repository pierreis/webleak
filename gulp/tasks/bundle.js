'use strict';

const runSequence = require('run-sequence');

module.exports = (callback) => {
  runSequence(['bundle:webtasks', 'bundle:config'], callback);
}