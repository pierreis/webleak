'use strict';

import axios from 'axios';
import { Base64 } from 'js-base64';

/* Static configuration */

const WEBTASK_TOKEN_ENDPOINT = 'https://webtask.it.auth0.com/api/tokens/inspect';


export default class TokenManager {

  constructor(ctx) {
    this._token = ctx.token;
  }

  /**
   * Decode a passed-in secret
   * 
   * @TODO replace with secure logic once wt-cli#161 gets answers
   * 
   * @param {string} token
   * @return the decoded token
   */
  async decode(token) {
    return JSON.parse(Base64.decode(token));
    //const masterToken = this._token;
    //const res = await axios({
    //  url: WEBTASK_TOKEN_ENDPOINT,
    //  method: 'get',
    //  query: { token },
    //  headers: { Authorization: `Bearer ${masterToken}` }
    //});
    //return res.data;
  }

}