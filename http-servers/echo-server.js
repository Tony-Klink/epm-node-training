import * as http from 'http';
import * as url from 'url';
import * as querystring from 'querystring';

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