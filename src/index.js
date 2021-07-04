import { app as server } from './test-server/index.js';
import { spawn } from 'child_process';
import path from 'path';

(async () => {
  try {
    for (const script of ['get', 'post']) {
      await new Promise((resolve) => {
        const workerScript = path.join('src', 'benchmark', `suite-${script}.js`);
        const workerProcess = spawn('node', [workerScript, server.url]);
        workerProcess.stdout.on('data', (data) => console.log(data.toString().replace(/\n$/g, '')));
        workerProcess.stderr.on('data', (data) => console.log(`stderr: ${data}`));
        workerProcess.on('close', (code) => {
          if (code != 0) {
            console.log('child process exited with code ' + code);
          }
          resolve();
        });
      });
    }
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
})();
