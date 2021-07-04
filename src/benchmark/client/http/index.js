// @ts-check
import http from 'http';

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function get(endpoint) {
  return new Promise((resolve, reject) => {
    http.request(
      endpoint,
      (res) => {
        let buf = Buffer.alloc(0);
        res.on('data', (chunk) => (buf = Buffer.concat([buf, chunk])));
        res.on('end', () => resolve(buf.toString('utf-8')));
      }
    )
    .on('error', (err) => reject(err))
    .end();
  });
}

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function post(endpoint) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      endpoint,
      {
        method: 'POST',
        headers: {
          'content-type': 'text/plain',
        }
      },
      (res) => {
        let buf = Buffer.alloc(0);
        res.on('data', (chunk) => (buf = Buffer.concat([buf, chunk])));
        res.on('end', () => {
          resolve(buf.toString('utf-8'));
          req.removeAllListeners();
          res.removeAllListeners();
        });
        res.on('error', reject);
      }
    );
    req.on('error', reject);
    req.write('');
    req.end();

  });
}

export { get, post };
