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

    suite.add('http.request GET request', {
      defer: true,
      fn: (defer) => {
        http.request(ENDPOINT, (res) => {
          res.resume().on('end', () => defer.resolve());
        }).end();
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

    suite.add('Axios GET request', {
      defer: true,
      fn: (defer) => {
        axios.get(ENDPOINT, { cache: false }).then(() => defer.resolve());
      }
    });

    suite.add('Got GET request', {
      defer: true,
      fn: (defer) => {
        got.get(ENDPOINT).then(() => defer.resolve());
      }
    });

    suite.add('Phin GET request', {
      defer: true,
      fn: (defer) => {
        phin(ENDPOINT).then(() => defer.resolve());
      }
    });

    suite.add('NodeFetch GET request', {
      defer: true,
      fn: (defer) => {
        fetch(ENDPOINT).then((res) => res.text()).then(() => defer.resolve());
      }
    });

    suite.run({
      async: true
    });

  });
})();
