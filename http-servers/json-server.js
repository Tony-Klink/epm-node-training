import { createServer } from 'http';

const port = 8080;
const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' }
    ]
 };

const server = createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(JSON.stringify(product));
    res.end();
});



server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
  
    console.log(`server is listening on ${port}`)
  })