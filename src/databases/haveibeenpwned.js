'use strict';

import axios from 'axios';
import urlencode from 'urlencode';

import { timeout } from '../helpers/async';

/* Static configuration */

const HAVEIBEENPWNED_ENDPOINT = 'https://haveibeenpwned.com/api/v2/breachedaccount';
const THROTTLE_DELAY_MS = 1200;

/**
 * Get last pwns for accounts
 * 
 * @return a map associating each twitter account to its last tweet id
 */

export default async (accounts) => {
  const pwns = [];
  let isFirst = true;
  for (let i in accounts) {
    if (!isFirst) await timeout(THROTTLE_DELAY_MS); // Avoid API throttling with a reasonable delay
    else isFirst = false;
    pwns[i] = await pwnsForAccount(accounts[i]);
  }
  const state = {};
  for (let i in accounts) {
    if (Object.keys(pwns[i]).length) state[accounts[i]] = pwns[i];
  }
  return state;
}

/**
 * Get pwns for a specific account
 * 
 * @param {str} account the account to search pwns for
 * @return a promise resolving to all pwns for `account` in the database
 */

const pwnsForAccount = async (account) => {
  const urlencodedAccount = urlencode(account);
  let pwnsResponse;
  try {
    pwnsResponse = await axios.get(`${HAVEIBEENPWNED_ENDPOINT}/${urlencodedAccount}`);
  } catch(err) {
    if (err.response.status === 404) return {};
    throw err;
  }
  const pwns = {};
  pwnsResponse.data.forEach((pwn) => {
    pwns[pwn.Title] = {
      name: pwn.Title,
      domain: pwn.Domain,
      date: pwn.BreachDate
    }
  });
  return pwns;
}