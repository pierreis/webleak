'use strict';

const runSequence = require('run-sequence');

module.exports = (callback) => {
  runSequence('configure:accounts', 'configure:trigger', 'configure:notify', 'configure:webtask', callback);
}  
