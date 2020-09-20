const http = require('http');
const fs = require('fs');

http.createServer((Request, Response) => {
    const file = fs.readFileSync('index.html', { encoding: "utf-8"} )


Response.writeHead(200, {'Content-Type': 'text/html'});
Response.write(file);
Response.end();
}).listen(1111);