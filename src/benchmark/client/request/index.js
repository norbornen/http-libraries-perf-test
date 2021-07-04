// @ts-check
import request from 'request';

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function get(endpoint) {
  return new Promise((resolve, reject) => {
    request(endpoint, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      resolve(body);
    });
  });
}

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function post(endpoint) {
  return new Promise((resolve, reject) => {
    request.post({ url: endpoint }, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      resolve(body);
    });
  });
}

export { get, post };
