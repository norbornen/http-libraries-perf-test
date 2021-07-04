// @ts-check
import phin from 'phin';

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function get(endpoint) {
  const { body } = await phin(endpoint);
  return body.toString('utf8');
}

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function post(endpoint) {
  const { body } = await phin({ url: endpoint, method: 'POST' });
  return body.toString('utf8');
}

export { get, post };
