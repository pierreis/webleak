'use strict';

import config from './helpers/config';

/**
 * Query configured leak databases
 * 
 * @param {object} context the context object
 * @return a promise resolving to a map of new leaks for each account, if any
 */
export default async function checkLeaks(context) {
  
  // Get leaks from databases
  let databaseLeaks = await Promise.all((config.databases || []).map(async (database) => {
    return await checkLeakInDatabase(context, database, config.accounts || []);
  }));

  // Merge leak databases
  const leaks = mergeDatabaseLeaks(databaseLeaks);
  
  // See if we have new leaks from database
  const previousLeaks = await context.db.get('leaks') || {};
  const newLeaks = leakDiff(leaks, previousLeaks);

  // Save leaks to database
  await context.db.set('leaks', leaks);

  return [newLeaks, leaks];
}

/**
 * @private
 * 
 * Search for leaks in a specific database
 * 
 * @param {object} context the context object
 * @param {string} database the database to search in
 * @param {[string]} accounts the account ids to search for
 * @return a promise resolving to the list of leaks for each of `accounts` in `database`
 */
async function checkLeakInDatabase(context, database, accounts) {
  const db = require(`./databases/${database}`).default;
  const leakResult = await Promise.resolve(db(accounts));
  return leakResult;
}

/**
 * @private
 * 
 * Merges leak results [{account: [leaks]}, {account, [leaks2]}] => [{account: {leak: ..., leak2: ...}}]
 * 
 * @param {object} databaseLeaks the individual leaks to merge
 * @return the merged leaks
 */
function mergeDatabaseLeaks(databaseLeaks) {
  leaks = {};
  config.accounts.forEach((account) => {
    const data = {};
    Object.assign.bind(null, data).apply(null, config.databases.map((db, i) => databaseLeaks[i][account] || {}));
    if (Object.keys(data).length) leaks[account] = data;
  });
  return leaks;
}

/**
 * @private
 * 
 * Returns the difference between two sets of leaks
 * 
 * @param {object} fresh the fresh leaks
 * @param {object} previous the previous leaks
 * @return the leak difference
 */
function leakDiff(fresh, previous) {
  const diff = {};
  config.accounts.forEach((account) => {
    const freshAccount = fresh[account] || {};
    const previousAccount = previous[account] || {};
    const previousAccountKeys = Object.keys(previousAccount);
    const leakDiff = Object.keys(freshAccount).filter((leak) => previousAccountKeys.indexOf(leak) === -1);
    if (leakDiff.length) {
      diff[account] = {};
      leakDiff.forEach(leakKey => diff[account][leakKey] = freshAccount[leakKey]);
    }
  });
  return diff;
}