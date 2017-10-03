'use strict';

import config from './helpers/config';

/**
 * Send notifications regarding new leaks for the user accounts.
 * 
 * @param {object} context the context object
 * @param {object} leaks the leaks to notify about
 * @return a promise resolving to the notification results
 */
export default async function notify(context, leaks) {
  const message = buildMessage(leaks);
  return await Promise.all(Object.keys(config.notify).map(key => notifyChannel(context, config.notify[key], message, leaks)));
}

/**
 * @private
 * 
 * Send notifications through a specific channel.
 * 
 * @param {object} context the context object 
 * @param {string} channel the specific channel string
 * @param {string} message the formatted message to send
 * @param {object} leaks the leaks to notify about
 * @return a promise resolving to the notification result
 */
async function notifyChannel(context, channel, message, leaks) {
  const notifier = require(`./notify/${channel.method}`).default;
  const notificationResult = await Promise.resolve(notifier(context, channel.config, message, leaks));
  return notificationResult;
}

/**
 * @private
 * 
 * Builds a default notification message.
 * 
 * @param {object} leaks the leaks to notify about
 * @return the formatted notification message
 */
function buildMessage(leaks) {
  const parts = [];
  for (let account of Object.keys(leaks)) {
    leakList = Object.keys(leaks[account]).join(', ');
    parts.push(`${account} (${leakList})`);
  }
  return ['New leaks:', parts.join(', ')].join(' ');
}