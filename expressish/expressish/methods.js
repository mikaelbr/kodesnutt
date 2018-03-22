const fs = require('fs');
const path = require('path');
const { getFilteredUrl } = require('./utils');

function isMethod(req, method) {
  const _m = method
    .split(',')
    .map(i => i.trim().toLowerCase());
  const providedMethod = req.method.toLowerCase();
  return _m.some(i => i === providedMethod || i === '*');
}

function isPath(req, p) {
  return getFilteredUrl(req.url) === p || p === '*';
}

function endpoint(method, p, cb) {
  return async function middleware(req, res, next) {
    const isHit = isMethod(req, method) && isPath(req, p);
    const fn = isHit ? cb : next;
    return fn(req, res);
  };
}

function partial(fn, ...args) {
  return (...inner) => fn(...args, ...inner);
}

module.exports = {
  get: partial(endpoint, 'GET'),
  post: partial(endpoint, 'POST'),
  all: partial(endpoint, '*')
};
