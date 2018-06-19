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
  const { method, url } = request;
  response.writeHead(200);

  request.on('data', function (message) {
    if (method === 'GET') {
      response.write(method + ': ' + message);
    } else if (method === 'POST') {
      response.write(method + ': ' + message);
    } else {
      response.write('UNKNOWN METHOD');
    }
  });
  request.on('end', function () {
    response.end();
  });
});

server.listen(port, function () {
  console.log("listening on port " + port);
});