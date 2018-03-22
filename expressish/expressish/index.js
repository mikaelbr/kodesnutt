const fs = require('fs');
const path = require('path');
const { getFilteredUrl } = require('./utils');
const { error } = require('./sinks');

const baseFile = path.join(__dirname, '..', 'public');

function fileServe(filename) {
  return async function(req, res) {
    const file = path.join(
      baseFile,
      getFilteredUrl(filename)
    );
    return new Promise(function(resolve) {
      const stream = fs.createReadStream(file);

      stream
        .on('error', () =>
          resolve(error(res, 404, 'Not found'))
        )
        .pipe(res)
        .on('end', () => resolve(stream));
    });
  };
}

function staticFiles(req, res) {
  if (req.url.includes('..')) {
    return error(res, 400, 'Bad Request');
  }
  return fileServe(req.url)(req, res);
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
