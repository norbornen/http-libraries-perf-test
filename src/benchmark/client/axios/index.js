// @ts-check
import axios from 'axios';

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function get(endpoint) {
  const { data } = await axios.get(endpoint);
  return data;
}

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function post(endpoint) {
  const { data } = await axios.post(endpoint, '');
  return data;
}

export { get, post };
