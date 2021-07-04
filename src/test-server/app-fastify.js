// @ts-check
import fastify from 'fastify';
import formBodyPlugin from 'fastify-formbody';

const app = fastify({
  // logger: true
});
app.register(formBodyPlugin);

app.get('/test', (req, res) => {
  res.type('text/html').send('answer');
});

app.post('/test', (req, res) => {
  res.type('text/html').send('answer');
});

app.setErrorHandler((err, request, reply) => console.error(err));

await app.listen(
  +process.env.port,
  process.env.host
);

export { app }
