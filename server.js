const http = require('http');
const fs = require('fs');
const Url = require('url-parse');

http.createServer((Request, Response) => {
    if(Request.url === '/favicon.ico') return;
    
    const url = new Url(Request.url, true);
    
    const name = url.query.name;
    const age = url.query.age;

    const person = {
      name,
      age,
    };

    fs.writeFileSync('db.json', JSON.stringify([person]));

    let file = fs.readFileSync('index.html', { encoding: "utf-8"} )
    file = file.replace(/%name%/g, name);

Response.writeHead(200, {'Content-Type': 'text/html'});
Response.write(file);
Response.end();
}).listen(1111);

console.log("Listenning...");