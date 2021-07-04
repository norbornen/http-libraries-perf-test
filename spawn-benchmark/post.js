import Benchmark from 'benchmark';
import http from 'http';
import axios from 'axios';
import got from 'got';
import superagent from 'superagent';
import request from 'request';
import phin from 'phin';
import fetch from 'node-fetch';

const HOST = process.argv[process.argv.length - 1];
const ENDPOINT = `${HOST}/test`;

(async () => {
  await new Promise((resolve, reject) => {
    const suite = new Benchmark.Suite('test-perf', {
      onAbort: (e) => reject(e),
      onError: (e) => reject(e),
      onReset: (e) => reject(e),
      onCycle: (ev) => console.log(String(ev.target)),
      onComplete: function(_ev) {
        const fastest = this.filter('fastest').map('name');
        console.log(`\nFastest is "${fastest}"\n`);
        resolve();
      }
    });

    suite.add('http.request POST request', {
      defer: true,
      fn: (defer) => {
        const req = http.request(ENDPOINT, { method: 'POST' }, (res) => {
          res.resume().on('end', () => defer.resolve());
        });
        req.write('');
        req.end();
      }
    });

    suite.add('Superagent POST request', {
      defer: true,
      fn: (defer) => {
        superagent.post(ENDPOINT).send().then(() => defer.resolve());
      }
    });

    suite.add('Request POST request', {
      defer: true,
      fn: (defer) => {
        request.post({ url: ENDPOINT }, () => defer.resolve());
      }
    });

    suite.add('Axios POST request', {
      defer: true,
      fn: (defer) => {
        axios.post(ENDPOINT, { cache: false }).then(() => defer.resolve()); // .catch((err) => defer.reject(err));
      }
    });

    suite.add('Got POST request', {
      defer: true,
      fn: (defer) => {
        got.post(ENDPOINT).then(() => defer.resolve());
      }
    });

    suite.add('Phin POST request', {
      defer: true,
      fn: (defer) => {
        phin({ url: ENDPOINT, method: 'POST' }).then(() => defer.resolve());
      }
    });

    suite.add('NodeFetch POST request', {
      defer: true,
      fn: (defer) => {
        fetch(ENDPOINT, { method: 'POST' }).then(() => defer.resolve());
      }
    });

    suite.run({
      async: true
    });

  });
})();
