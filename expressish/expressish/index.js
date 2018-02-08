const fs = require('fs');
const path = require('path');
const { getFilteredUrl } = require('./utils');

function error(res, code, message) {
  res.writeHead(code, {
    'Content-Type': 'text/html'
  });
  return res.end(`${code} - ${message}`, 'utf8');
}

function fileServe(filename) {
  return function(req, res) {
    fs
      .createReadStream(
        path.join(__dirname, '..', 'public', getFilteredUrl(filename))
      )
      .on('error', () => error(res, 404, 'Not found'))
      .pipe(res);
  };
}

function staticFiles(req, res) {
  if (req.url.includes('..')) {
    return error(res, 400, 'Bad Request');
  }
  fileServe(req.url)(req, res);
}

function app([endpoint, ...rest]) {
  return function(req, res) {
    if (!endpoint) {
      return error(res, 404, 'Not Found');
    }
    return endpoint(req, res, app(rest));
  };
}

module.exports = {
  app,
  staticFiles,
  fileServe
};
