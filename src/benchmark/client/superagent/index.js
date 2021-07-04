// @ts-check
import superagent from 'superagent';

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function get(endpoint) {
  const res = await superagent.get(endpoint).timeout(60000);
  return res.text;
}

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function post(endpoint) {
  const res = await superagent.post(endpoint).timeout(60000).type('form').send('');
  return res.text;
}

export { get, post };
