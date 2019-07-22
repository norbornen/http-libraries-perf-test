const got = require('got');
const nock = require('nock');

nock('https://sindresorhus.com')
    .get('/')
    .reply(200, 'Hello world!');

(async () => {
    const response = await got('https://sindresorhus.com', {json: true});
    console.log(response.body);
    //=> 'Hello world!'
})();

/*
const http = require('http');
const axios = require('axios');
const got = require('got');
const superagent = require('superagent');
const request = require('request');

const nock = require('nock');
const HOST = 'test-perf.com';

axios.defaults.baseURL = `http://${HOST}`;

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

nock(`http://${HOST}`).persist()
    // .log(console.log)
    .get('/test').reply(200, 'ok')
    .post('/test').reply(200, 'ok');

suite.add('http.request POST request', {
    defer: true,
    fn: (defer) => {
        const req = http.request({ host: HOST, path: '/test', method: 'POST' }, (res) => {
            res.resume().on('end', () => defer.resolve());
        });
        req.write();
        req.end();
    }
});

suite.add('http.request GET request', {
    defer: true,
    fn: (defer) => {
        http.request({ path: '/test', host: HOST }, (res) => {
            res.resume().on('end', () => defer.resolve());
        }).end();
    }
});

suite.add('axios GET request', {
    defer: true,
    fn: (defer) => {
        axios.get('/test').then(() => defer.resolve());
    }
});

suite.add('axios POST request', {
    defer: true,
    fn: (defer) => {
        axios.post('/test').then(() => defer.resolve());
    }
});

suite.add('got GET request', {
    defer: true,
    fn: async (defer) => {
        try {
            const r = await got.get(`http://${HOST}/test`);
            console.log(r);
            
        } catch (err) {
            console.log(err);
        }
        defer.resolve();
        process.exit(1)
        // got.get(`http://${HOST}/test`).then(() => defer.resolve()).catch((err) => defer.resolve(err));
    }
});

suite.add('got POST request', {
    defer: true,
    fn: (defer) => {
        // got.post(`http://${HOST}/test`).then(() => defer.resolve()).catch((err) => defer.resolve(err));
    }
});

suite.add('superagent GET request', {
    defer: true,
    fn: (defer) => {
        superagent.get(`http://${HOST}/test`).end(() => defer.resolve());
    }
});

suite.add('superagent POST request', {
    defer: true,
    fn: (defer) => {
        superagent.post(`http://${HOST}/test`).send().end(() => defer.resolve());
    }
});

suite.add('Request GET request', {
    defer: true,
    fn: (defer) => {
        request(`http://${HOST}/test`, () => defer.resolve());
    }
});

suite.add('Request POST request', {
    defer: true,
    fn: (defer) => {
        request.post({ url: `http://${HOST}/test` }, () => defer.resolve());
    }
});

suite.on('complete', function(defer) {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.on('cycle', function(event) {
    console.log(String(event.target));
});

suite.run({ async: true });

*/

