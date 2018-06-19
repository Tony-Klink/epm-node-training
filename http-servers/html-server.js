import { createServer } from 'http';
import * as fs from 'fs';
import replace from 'stream-replace';

const port = 8080;


const server = createServer((req, res) => {
    const filePath = 'public/index.html';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(filePath).pipe(replace(/{message}/gi, 'Hello HTML server')).pipe(res);
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});