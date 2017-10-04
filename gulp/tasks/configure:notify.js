'use strict';

const runSequence = require('run-sequence');

const prompt = require('gulp/helpers/prompt');
const validate = require('gulp/helpers/validate');

module.exports = (callback) => {
  
    const questions = [
      {
        type: 'checkbox',
        name: 'notify',
        message: 'Which notification methods to use?',
        choices: ['Twilio'],
        validate: validate.selectOne
      }
    ];
  
    function onAnswered(res) {
      if (res.notify.length) {
        return runSequence(res.notify.map((name) => `configure:${name.toLowerCase()}`), callback);
      }
      callback();
    }
  
    prompt(questions).then(onAnswered).catch((err) => callback(err));
  }