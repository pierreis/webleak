'use strict';

const runSequence = require('run-sequence');

const prompt = require('gulp/helpers/prompt');

module.exports = (callback) => {
  
    const questions = [
      {
        type: 'list',
        name: 'trigger',
        message: 'Which trigger to use?',
        choices: ['Twitter', 'None']
      }
    ];
  
    function onAnswered(res) {
      if (res.trigger === 'Twitter') return runSequence(['configure:twitter'], callback);
      return callback();
    }
  
    prompt(questions).then(onAnswered).catch((err) => callback(err));
  }