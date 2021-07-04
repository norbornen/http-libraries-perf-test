// @ts-check
import fetch from 'node-fetch';

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function get(endpoint) {
  const res = await fetch(endpoint);
  const data = await res.text();
  return data;
}

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function post(endpoint) {
  const res = await fetch(endpoint, { method: 'POST' });
  const data = await res.text();
  return data;
}

export { get, post };
