'use strict';

import { promisify } from './async';

/**
 * Access to Webtask context storage
 */
export default class ContextStorage {

  constructor(ctx) {
    this._storage = ctx.storage;
  }

  /**
   * Asynchronously get stored value
   * 
   * @param {string} key the key of the stored value
   * @return a promise resolving to the stored value for `key`, or `null` if it does not exist
   */
  async get(key) {
    const data = await this._getRaw();
    return data[key];
  }

  /**
   * Asynchronously sets stored value
   * 
   * @param {string} key the key of the stored value
   * @param {*} value the value to store
   * @return a promise throwing an error if unsuccessful
   */
  async set(key, value) {
    const data = await this._getRaw();
    data[key] = value;
    return await this._setRaw(data);
  }

  /**
   * @private
   * 
   * Asynchronously fetches the stored data
   * 
   * @return a promise relsolving to the stored value
   */
  async _getRaw() {
    return (await promisify(this._storage.get.bind(this._storage))) || {};
  }

  /**
   * @private
   * 
   * Asynchronously sets stored data to value.
   * 
   * @todo handle conflicts
   * 
   * @param {object} value the value to set
   * @return a promise relsolving to the stored value
   */
  async _setRaw(value) {
    return await promisify((cb) => this._storage.set(value, { force: true }, cb));
  }

}