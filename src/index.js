import config from './helpers/config';
import DB from './helpers/db';
import checkLeaks from './leaks';
import notify from './notify';
import shouldUpdate from './triggers';
import TokenManager from './helpers/token';

/**
 * Controls the logic of the task, which is:
 * 
 * 1. Run triggers to check for new leak data available. Alternatively, the update can be forced with the `force` URL parameter,
 * 2. If any trigger fires, search the watched accounts in the leak databases, and chec for new leaks,
 * 3. If any new leak matches, try to notify the user,
 * 4. Save any failed notification so we can retry later
 * 
 * @param {object} ctx the webtask context
 * @return the response, { updated, leaks }
 */
async function process(ctx) {

  // Create context
  const context = {
    webtask: ctx,
    db: new DB(ctx),
    token: new TokenManager(ctx)
  }

  // Should we update?
  const triggerUpdate = ctx.data.force !== undefined || await shouldUpdate(context);
  if (!triggerUpdate) return { updated: false, notified: false, leaks: await context.db.get('leaks') || {} };

  // Okay, let's update
  const [fresh, all] = await checkLeaks(context);
  if (!Object.keys(fresh).length) return { updated: true, notified: false, leaks: all || {} };

  // Notify if any fresh leaks
  await notify(context, fresh);

  return { updated: true, notified: true, leaks: all };
}

/*
 * Exports
 * 
 * Basically just converts callback-based API to promises
 */

module.exports = (ctx, cb) => {
  process(ctx)
    .then((res) => cb(null, res))
    .catch((err) => cb(err));
}