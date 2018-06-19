import * as http from 'http';
import * as url from 'url';
import * as querystring from 'querystring';

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