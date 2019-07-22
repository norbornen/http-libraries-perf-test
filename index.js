const createTestServer = require('create-test-server');
const Benchmark = require('benchmark');
const http = require('http');
const https = require('https');
const axios = require('axios');
const got = require('got');
const superagent = require('superagent');
const request = require('request');

(async () => {
    const server = await createServer();
    try {
        await runSuite(server.url);
        // await runSuite(server.sslUrl);
    } catch (err) {
        console.error(err);
    }
    await server.close();
})();

async function createServer() {
    const server = await createTestServer({
        bodyParser: {
            type: () => false
        }
    });
    server.get('/test', 'answer');
    server.post('/test', (req, res) => res.send('answer'));
    return server;
}

async function runSuite(HOST) {
    return new Promise((resolve, reject) => {
        const suite = new Benchmark.Suite('test-perf', {
            onAbort: (e) => reject(e),
            onError: (e) => reject(e),
            onReset: (e) => reject(e),
            onCycle: (ev) => console.log(String(ev.target)),
            onComplete: function(ev) {
                const fastest = this.filter('fastest').map('name');
                console.log(`\nFastest is "${fastest}"\n`);
                resolve();
            }
        });

        const endpoint = `${HOST}/test`;

        suite.add('http.request POST request', {
            defer: true,
            fn: (defer) => {
                const req = http.request(endpoint, { method: 'POST' }, (res) => {
                    res.resume().on('end', () => defer.resolve());
                });
                req.write('');
                req.end();
            }
        });

        suite.add('http.request GET request', {
            defer: true,
            fn: (defer) => {
                http.request(endpoint, (res) => {
                    res.resume().on('end', () => defer.resolve());
                }).end();
            }
        });

        suite.add('Axios POST request', {
            defer: true,
            fn: (defer) => {
                axios.post(endpoint).then(() => defer.resolve()); // .catch((err) => defer.reject(err));
            }
        });

        suite.add('Axios GET request', {
            defer: true,
            fn: (defer) => {
                axios.get(endpoint).then(() => defer.resolve());
            }
        });

        suite.add('Got POST request', {
            defer: true,
            fn: (defer) => {
                got.post(endpoint).then(() => defer.resolve());
            }
        });

        suite.add('Got GET request', {
            defer: true,
            fn: (defer) => {
                got.get(endpoint).then(() => defer.resolve());
            }
        });

        suite.add('Superagent POST request', {
            defer: true,
            fn: (defer) => {
                superagent.post(endpoint).send().end(() => defer.resolve());
            }
        });

        suite.add('Superagent GET request', {
            defer: true,
            fn: (defer) => {
                superagent.get(endpoint).end(() => defer.resolve());
            }
        });

        suite.add('Request POST request', {
            defer: true,
            fn: (defer) => {
                request.post({ url: endpoint }, () => defer.resolve());
            }
        });

        suite.add('Request GET request', {
            defer: true,
            fn: (defer) => {
                request(endpoint, () => defer.resolve());
            }
        });

        suite.run({ async: true });
    });
}
