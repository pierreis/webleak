'use strict';

const axios = require('axios');

const config = require('gulp/helpers/config');
const prompt = require('gulp/helpers/prompt');
const token = require("gulp/helpers/token");
const validate = require('gulp/helpers/validate');

module.exports = (callback) => {

  const questions = [
    {
      type: 'input',
      name: 'accounts',
      message: 'Comma-separated list of accounts to watch?',
      validate: validate.notEmpty,
    }
  ];

  function onAnswered(data) {
    console.log('Saving configuration...');
    config.saveRaw('accounts', data.accounts.split(',').map((account) => account.trim()));
    callback();
  }

  prompt(questions).then(onAnswered).catch((err) => callback(err));
}