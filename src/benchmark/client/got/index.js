// @ts-check
import got from 'got';

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function get(endpoint) {
  const { body } = await got.get(endpoint);
  return body;
}

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function post(endpoint) {
  const { body } = await got.post(endpoint);
  return body;
}

export { get, post };
