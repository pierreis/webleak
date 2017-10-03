'use strict';

import config from './helpers/config';

export default async function notify(context, leaks) {
  const message = buildMessage(leaks);
  return await Promise.all(Object.keys(config.notify).map(key => notifyChannel(context, config.notify[key], message, leaks)));
}

async function notifyChannel(context, channel, message, leaks) {
  const notifier = require(`./notify/${channel.method}`).default;
  const notificationResult = await Promise.resolve(notifier(context, channel.config, message, leaks));
  return notificationResult;
}

function buildMessage(leaks) {
  const parts = [];
  for (let account of Object.keys(leaks)) {
    leakList = Object.keys(leaks[account]).join(', ');
    parts.push(`${account} (${leakList})`);
  }
  return ['New leaks:', parts.join(', ')].join(' ');
}