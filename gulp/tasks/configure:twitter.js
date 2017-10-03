'use strict';

const axios = require('axios');
const qs = require('qs');

const config = require('gulp/helpers/config');
const prompt = require('gulp/helpers/prompt');
const token = require('gulp/helpers/token');
const validate = require('gulp/helpers/validate');

const TWITTER_TOKEN_URI = 'https://api.twitter.com/oauth2/token';

module.exports = (callback) => {

  const questions = [
    {
      type: 'input',
      name: 'clientId',
      message: 'Consumer Key?',
      validate: validate.notEmpty,

    },
    {
      type: 'password',
      name: 'clientSecret',
      message: 'Consumer Secret?',
      validate: validate.notEmpty,
    },
    {
      type: 'input',
      name: 'accounts',
      message: 'Comma-separated list of accounts to follow?',
      default: 'haveibeenpwned',
      validate: validate.notEmpty

    }
  ];

  function onAnswered(data) {
    console.log('Requesting token from Twitter credentials...');
    data.accounts = data.accounts.split(',').map(val => val.trim());
    axios({
      url: TWITTER_TOKEN_URI,
      method: 'post',
      data: qs.stringify({
        grant_type: 'client_credentials'
      }),
      auth: {
        username: data.clientId,
        password: data.clientSecret
      },
      withCredentials: true,
    })
    .catch((err) => console.log(err.stack))
    .then(res => onTwitterResponse({ token: res.data.access_token, accounts: data.accounts }));
  }

  function onTwitterResponse(data) {
    console.log('Generating Webtask secret for Twitter token...');
    token.createSecret('trigger-autoconfig-twitter', { token: data.token }, (err, res) => {
      if (err) throw err;
      data.token = res;
      onTokenResponse(data);
    });
  }

  function onTokenResponse(data) {
    console.log('Saving configuration...');
    config.saveObject('triggers', 'autoconfig:twitter', {
      trigger: 'twitter',
      config: {
        token: data.token,
        accounts: data.accounts
      }
    });
    callback();
  }

  prompt(questions).then(onAnswered).catch((err) => callback(err));
}