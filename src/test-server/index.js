// @ts-check
import path from 'path';
import cluster from 'cluster';
import os from 'os';
import getPort from 'get-port';

let app;

if (cluster.isPrimary) {
  cluster.setupPrimary({
    exec: path.join('src', 'test-server', 'app-fastify.js')
  });

  const host = '127.0.0.1';
  const port = await getPort();
  app = { url: `http://${host}:${port}` };

  const workersNum = os.cpus().length;

  for (let i = 0; i < 2; i++) {
    cluster.fork({ port, host });
  }
  cluster.on('exit', (worker) => console.log(`Worker ${worker.process.pid} died`));
}

export { app };
