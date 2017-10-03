'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');

const CONFIG_PATH = 'dist/config';
const CONFIG_FILE = `${CONFIG_PATH}/config.json`;

const get = module.exports.get = function() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return require('gulp/template/config');
  }
  else {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  }
}

const saveRaw = module.exports.saveRaw = function (category, data) {
  const config = get();
  config[category] = data;
  save(config);
}

module.exports.saveObject = function (category, key, data) {
  const config = get();
  if (!config[category]) config[category] = {}; // Shouldn't happen
  config[category][key] = data;
  save(config);
}

function save(config) {
  if (!fs.existsSync(CONFIG_PATH)) mkdirp.sync(CONFIG_PATH);
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}