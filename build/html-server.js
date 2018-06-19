'use strict';

var _http = require('http');

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _streamReplace = require('stream-replace');

var _streamReplace2 = _interopRequireDefault(_streamReplace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const port = 8080;

const server = (0, _http.createServer)((req, res) => {
    const filePath = 'public/index.html';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(filePath).pipe((0, _streamReplace2.default)(/{message}/gi, 'Hello HTML server')).pipe(res);
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(port, err => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});