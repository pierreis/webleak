'use strict';

/**
 * Wraps a callback-based function inside a promise.
 * 
 * @param {function} fn the function `fn(callback(err, result))` to wrap.
 * @returns a promise resolving to `result` when successful, or rejecting with `err` if not.
 */
export function promisify(fn) {
  return new Promise((resolve, reject) => {
    fn((err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}

/**
 * Returns a promise that resolves after some time has elapsed.
 * 
 * @param {number} ms the delay in milliseconds
 * @return a promise that resolved after `ms` milliseconds
 */
export const timeout = (ms) => new Promise(res => setTimeout(res, ms));