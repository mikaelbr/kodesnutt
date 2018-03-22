const http = require('http');
const {
  app,
  fileServe,
  staticFiles
} = require('./expressish');

const { get, all } = require('./expressish/methods');
const { getFilteredUrl } = require('./expressish/utils');
const { error } = require('./expressish/sinks');

async function logMiddleware(req, res, next) {
  const result = await next(req, res);
  console.log(
    `${new Date()}: ${req.method} ${req.url} (Returned: ${
      res.statusCode
    })`
  );
  return result;
}

function authDecorator(fn) {
  return function(p, cb) {
    return async function(req, res, next) {
      const isHit = getFilteredUrl(req.url) === p;
      const hasAccessToken = req.url.includes(
        'access_token'
      );

      if (isHit && !hasAccessToken) {
        return error(res, 401, 'Unauthorized');
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
      authedGet('/', fileServe('index.html')),
      all('*', staticFiles)
    ])
  )
  .listen(process.env.PORT || 8080, function() {
    console.log('Listning on http://localhost:8080');
  });
