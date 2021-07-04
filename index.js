import createTestServer from 'create-test-server';
import { spawn } from 'child_process';

(async () => {
  const server = await createTestServer({
    bodyParser: {
      type: () => false
    }
  });
  server.get('/test', 'answer');
  server.post('/test', (req, res) => res.send('answer'));

  try {
    for (const script of ['get', 'post']) {
      await new Promise((resolve) => {
        const workerProcess = spawn('node', [`./spawn-benchmark/${script}.js`, server.url]);
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

  console.log('server close...');
  await server.close();
})();
