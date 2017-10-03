'use strict';

import twilio from 'twilio';

/**
 * Sends a twilio text message
 * 
 * @param {object} config the twilio configuration
 * @param {string} message the pre-formatted message
 * @param {object} leaks the leaks to notify about
 */
export default async (context, config, message, leaks) => {
  const token = (await context.token.decode(config.token));
  const client = new twilio(token.sid, token.token);
  const text = await client.messages.create({
    body: message,
    from: config.from,
    to: config.to,
  });
  return text.sid;
}