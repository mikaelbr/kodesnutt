const http = require('http');
const {
  app,
  fileServe,
  staticFiles
} = require('./expressish');

const { get, all } = require('./expressish/methods');
const { getFilteredUrl } = require('./expressish/utils');

function logMiddleware(req, res, next) {
  console.log(`${new Date()}: ${req.method} ${req.url}`);
  return next(req, res);
}

function authMiddleware(...paths) {
  return function(req, res, next) {
    const isHit = paths.some(
      p => getFilteredUrl(req.url) === p
    );
    const hasAccessToken = req.url.includes('access_token');
    if (isHit && !hasAccessToken) {
      res.end('No access');
      return console.error('Unauthorized');
    }
    return next(req, res);
  };
}

function authEndpoint(fn) {
  return function(req, res, next) {
    const isHit =
      fn.path && getFilteredUrl(req.url) === fn.path;
    const hasAccessToken = req.url.includes('access_token');

    if (isHit && !hasAccessToken) {
      res.end('No access');
      return console.error('Unauthorized');
    }
    return fn(req, res, next);
  };
}

function authDecorator(fn) {
  return function(p, cb) {
    return function(req, res, next) {
      const isHit = getFilteredUrl(req.url) === p;
      const hasAccessToken = req.url.includes(
        'access_token'
      );

      if (isHit && !hasAccessToken) {
        res.end('No access');
        return console.error('Unauthorized');
      }
      return fn(p, cb)(req, res, next);
    };
  };
}

const authedGet = authDecorator(get);

http
  .createServer(
    app([
      logMiddleware,
      authMiddleware('/', '/index.html'),
      authEndpoint(get('/', fileServe('index.html'))),
      authedGet('/', fileServe('index.html')),
      all('*', staticFiles)
    ])
  )
  .listen(process.env.PORT || 8080, function() {
    console.log('Listning on http://localhost:8080');
  });
