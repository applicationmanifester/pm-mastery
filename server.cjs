const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const HTML_FILE = 'PM Mastery_ Learn, Revise, Practise.html';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let decodedPath = decodeURIComponent(req.url.split('?')[0]);
  if (decodedPath === '/' || decodedPath === '/index.html') {
    decodedPath = '/' + HTML_FILE;
  }

  const filePath = path.join(__dirname, decodedPath);
  
  // Security check: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

let currentPort = PORT;

function startServer(port) {
  server.listen(port, '127.0.0.1', () => {
    console.log('PM Mastery local server started successfully!');
    console.log('Local URL: http://localhost:' + port + '/');
    console.log('Direct IP: http://127.0.0.1:' + port + '/');
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    currentPort++;
    console.log('Port in use, trying port ' + currentPort + '...');
    startServer(currentPort);
  } else {
    console.error('Server error:', err);
  }
});

startServer(currentPort);
