const http = require('http');
const fs = require('fs');
const Url = require('url-parse');

http.createServer((Request, Response) => {
    if(Request.url === '/favicon.ico') return;
    
    const url = new Url(Request.url, true);
    
    console.log(url.query.name);
    const file = fs.readFileSync('index.html', { encoding: "utf-8"} )


Response.writeHead(200, {'Content-Type': 'text/html'});
Response.write(file);
Response.end();
}).listen(1111);

console.log("Listenning...");