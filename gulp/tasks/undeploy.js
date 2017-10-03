const config = require('gulp/helpers/config');
const shell = require('gulp/helpers/shell');
const token = require('gulp/helpers/token');

module.exports = (callback) => {

  // Start by loading the config
  const conf = config.get();
  
  // Deploy the script
  shell(['node_modules/.bin/wt-cli', 'rm', conf.webtask.name], (err, result) => {
    console.log(err);
    callback();
  });
}