'use strict';

import axios from 'axios';

/* Static configuration */

const TWITTER_ENDPOINT = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

/**
 * Get last tweet IDs for configured accounts
 * 
 * @return a map associating each twitter account to its last tweet id
 */

export default async (context, config) => {
  const token = (await context.token.decode(config.token)).token;
  const tweetIds = await Promise.all(config.accounts.map((account) => lastTweetIdForAccount(account, config, token)));
  const state = {};
  for (let i in config.accounts) {
    state[config.accounts[i]] = tweetIds[i];
  }
  return state;
}

/**
 * Get the last tweet ID for a specific twitter account
 * 
 * @param {str} account the twitter user to get last tweet id for
 * @return a promise resolving to the last tweet id for `account`, or `null` if no last tweet exists
 */

const lastTweetIdForAccount = async (account, config, token) => {
  const tweets = await axios.get(TWITTER_ENDPOINT, {
    params: {
      screen_name: account,
      count: 1,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return tweets.data && tweets.data.length ? tweets.data[0].id_str : null;
}