// @ts-check
import ky from 'ky-universal';

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function get(endpoint) {
  const data = await ky.get(endpoint, { timeout: 60000 }).text();
  return data;
}

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function post(endpoint) {
  const data = await ky.post(endpoint, { timeout: 60000 }).text();
  return data;
}

export { get, post };
