// @ts-check
import Benchmark from 'benchmark';
import { readdir } from 'fs/promises';
import path from 'path';

const HOST = process.argv[process.argv.length - 1];
const ENDPOINT = `${HOST}/test`;

(async () => {
  await new Promise(async (resolve, reject) => {
    const suite = new Benchmark.Suite('test-perf', {
      delay: 5,
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

    const clientPath = path.join('src', 'benchmark', 'client');
    for (const dir of await readdir(clientPath)) {
      const module = await import(`./client/${dir}/index.js`);
      suite.add(`[POST]  ${dir}`, {
        defer: true,
        fn: (defer) => module.post(ENDPOINT).then(() => defer.resolve()),
      });
    }

    suite.run({
      async: true
    });

  });
})();
