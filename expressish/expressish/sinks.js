function error(res, code, message) {
  res.writeHead(code, {
    'Content-Type': 'text/html'
  });
  console.log('dsads');
  return res.end(`${code} - ${message}`, 'utf8');
}

module.exports = { error };
