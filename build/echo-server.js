'use strict';

var _http = require('http');

var http = _interopRequireWildcard(_http);

var _url = require('url');

var url = _interopRequireWildcard(_url);

var _querystring = require('querystring');

var querystring = _interopRequireWildcard(_querystring);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const server = http.createServer();
const port = process.env.PORT || 8080;

server.on('request', function (request, response) {
  const uri = url.parse(request.url);
  const qs = uri.query ? querystring.parse(uri.query) : {};

  const status = qs.status || 200;
  const contentType = qs.contentType || 'text/plain';
  const body = qs.body || 'hello there!';

  response.writeHead(status, {
    'Content-Type': contentType,
    'Content-Length': body.length
  });

  console.log(`${uri.pathname} - HTTP ${status} ${contentType}: ${body}`);
  response.write(body);

  response.end();
});

server.listen(port, function () {
  console.log("listening on port " + port);
});