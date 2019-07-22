const Benchmark = require('benchmark');
const http = require('http');
const axios = require('axios');
const got = require('got');
const superagent = require('superagent');
const request = require('request');

const HOST = process.argv[ process.argv.length - 1 ];
const ENDPOINT = `${HOST}/test`;

(async () => {
    await new Promise((resolve, reject) => {
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

        suite.add('http.request GET request', {
            defer: true,
            fn: (defer) => {
                http.request(ENDPOINT, (res) => {
                    res.resume().on('end', () => defer.resolve());
                }).end();
            }
        });

        suite.add('Axios GET request', {
            defer: true,
            fn: (defer) => {
                axios.get(ENDPOINT, {cache: false}).then(() => defer.resolve());
            }
        });

        suite.add('Got GET request', {
            defer: true,
            fn: (defer) => {
                got.get(ENDPOINT).then(() => defer.resolve());
            }
        });

        suite.add('Superagent GET request', {
            defer: true,
            fn: (defer) => {
                superagent.get(ENDPOINT).then(() => defer.resolve());
            }
        });

        suite.add('Request GET request', {
            defer: true,
            fn: (defer) => {
                request(ENDPOINT, () => defer.resolve());
            }
        });

        suite.run({ async: true });
    });
})();
