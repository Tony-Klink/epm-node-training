'use strict';

var _http = require('http');

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const port = 8080;

const server = (0, _http.createServer)((req, res) => {
    const filePath = 'public/index.html';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fileToBuffer(filePath, (err, buffer) => {
        const message = 'Hello HTML server';
        const markupTemplate = /{message}/gi;
        let template = buffer.toString().replace(markupTemplate, message);
        res.write(template);
        res.end();
    });
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

const fileToBuffer = (filename, cb) => {
    let readStream = fs.createReadStream(filename);
    let chunks = [];

    // Handle any errors while reading
    readStream.on('error', err => {
        // handle error

        // File could not be read
        return cb(err);
    });

    // Listen for data
    readStream.on('data', chunk => {
        chunks.push(chunk);
    });

    // File is done being read
    readStream.on('close', () => {
        // Create a buffer of the image from the stream
        return cb(null, Buffer.concat(chunks));
    });
};