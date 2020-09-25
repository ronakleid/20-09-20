const http = require('http');
const fs = require('fs');
const Url = require('url-parse');

function renderHistory(history) {
  return history.reduce((html, {name, message}) => {
    html += `
    <div class="message">
    <span class="message-author">${name}: </span>
    <span class="message-text">${message}</span>
    </div>
    `;
    return html;
  }, '');
}

http.createServer((Request, Response) => {
    if (Request.url === '/favicon.ico') return;
    
    const url = new Url(Request.url, true);
    const name = url.query.name || '';
    const message = url.query.message || '';

    
    const historyEvent = {
      name,
      message,
    };

    const history = JSON.parse(fs.readFileSync('history.json')) || [];

    if (name !== '' && message !== '') {
      history.push(historyEvent);
      fs.writeFileSync('history.json', JSON.stringify(history));
    }

  
    let file = fs.readFileSync('index.html', { encoding: "utf-8"} )
    file = file.replace("%name%", name);
    file = file.replace("%messeges%", renderHistory(history));

Response.writeHead(200, {'Content-Type': 'text/html'});
Response.write(file);
Response.end();
}).listen(1111);

console.log("Listenning...");