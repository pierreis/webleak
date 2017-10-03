'use strict';

const axios = require('axios');

const config = require('gulp/helpers/config');
const prompt = require('gulp/helpers/prompt');
const token = require("gulp/helpers/token");
const validate = require('gulp/helpers/validate');

const TWITTER_TOKEN = 'https://api.twitter.com/oauth2/token';

module.exports = (callback) => {

  const questions = [
    {
      type: 'input',
      name: 'sid',
      message: 'Account SID?',
      validate: validate.notEmpty,
    },
    {
      type: 'password',
      name: 'token',
      message: 'Auth Token?',
      validate: validate.notEmpty,
    },
    {
      type: 'input',
      name: 'from',
      message: 'Send from number (must be registered to your Twilio account)?',
      validate: validate.phone,
    },
    {
      type: 'input',
      name: 'to',
      message: 'Send to number?',
      validate: validate.phone,
    }
  ];

  function onAnswered(data) {
    console.log('Generating Webtask secret for Twilio token...');
    token.createSecret('notify-autoconfig-twilio', { sid: data.sid, token: data.token }, (err, res) => {
      if (err) throw err;
      onTokenResponse({ token: res, to: data.to, from: data.from });
    });
  }

  function onTokenResponse(data) {
    console.log('Saving configuration...');
    config.saveObject('notify', 'autoconfig:twilio', {
      method: 'twilio',
      config: {
        token: data.token,
        from: data.from,
        to: data.to
      }
    });
  }

  prompt(questions).then(onAnswered).catch((err) => callback(err));
}