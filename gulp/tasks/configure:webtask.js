'use strict';

const config = require('gulp/helpers/config');
const prompt = require('gulp/helpers/prompt');
const validate = require('gulp/helpers/validate');

const TWITTER_TOKEN = 'https://api.twitter.com/oauth2/token';

module.exports = (callback) => {

  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Webtask name?',
      default: 'webleak',
      validate: validate.notEmpty,
    },
    {
      type: 'input',
      name: 'schedule',
      message: 'Cron schedule?',
      default: '1h',
      validate: validate.notEmpty,
    },
  ];

  function onAnswered(data) {
    console.log('Saving configuration...');
    config.saveRaw('webtask', {
      name: data.name,
      schedule: data.schedule
    });
  }

  prompt(questions).then(onAnswered).catch((err) => callback(err));
}