// @ts-check
import { fetch } from 'fetch-h2';

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function get(endpoint) {
  const res = await fetch(
    endpoint,
    { timeout: 60000 }
  );
  const data = await res.text();
  return data;
}

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function post(endpoint) {
  const res = await fetch(
    endpoint,
    {
      method: 'POST',
      body: '',
      timeout: 60000,
    }
  );
  const data = await res.text();
  return data;
}

export { get, post };
