'use strict';

import deepEquals from 'shallow-equals';

import config from './helpers/config';

/**
 * Determines if leaks should be checked by running triggers
 *
 * @param {object} context the context object
 * @return a promise resolving to `true` if leaks should be checked for, or `false` otherwise
 */

export default async function shouldUpdate(context) {
  if (!config.triggers || !Object.keys(config.triggers).length) return true;
  let triggerState = await Promise.all(Object.keys(config.triggers || {}).map(async (triggerId) => {
    return await processTrigger(context, triggerId, config.triggers[triggerId]);
  }));
  return triggerState.some((val) => val);
}

/**
 * Runs a specific tigger and saves its new state to storage if modified
 * 
 * @param {object} context the context object
 * @param {string} triggerId the id of the trigger to run
 * @param {object} triggerParams the parameters to pass to the trigger
 * @return a promise resolving to `true` if the trigger fires, or `false` otherwise
 */

async function processTrigger(context, triggerId, triggerParams) {
  const trigger = require(`./trigger/${triggerParams.trigger}`).default;
  const triggerResult = await Promise.resolve(trigger(context, triggerParams.config || {}));
  const storageKey = `trigger.${triggerId}`;
  const cachedResult = await context.db.get(storageKey);
  const result = !deepEquals(triggerResult, cachedResult);
  context.db.set(storageKey, triggerResult).catch(() => {}); // Can fail silently, but does not matter. Just return quickly.
  return result;
}