const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { middleware } = require('./middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    middleware(req, res, () => handle(req, res, parsedUrl));
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://literate-trout-5grg7q6wqvg4h6qw-3000.app.github.dev/');
  });
});
