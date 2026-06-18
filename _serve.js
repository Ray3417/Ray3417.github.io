const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8'
};

function safeResolve(reqPath) {
  const decoded = decodeURIComponent(reqPath.split('?')[0]);
  let filePath = path.join(ROOT, decoded);
  const absRoot = path.resolve(ROOT);
  const absFile = path.resolve(filePath);
  if (!absFile.startsWith(absRoot)) return null;
  return absFile;
}

const server = http.createServer((req, res) => {
  try {
    let reqPath = url.parse(req.url).pathname;
    if (reqPath === '/') reqPath = '/index.html';

    const filePath = safeResolve(reqPath);
    if (!filePath) {
      res.writeHead(403); res.end('Forbidden'); return;
    }

    fs.stat(filePath, (err, stat) => {
      let finalPath = filePath;
      if (err || !stat.isFile()) {
        const alt = filePath + '.html';
        if (fs.existsSync(alt) && fs.statSync(alt).isFile()) {
          finalPath = alt;
        } else if (fs.existsSync(filePath.replace(/\.htm$/, '.html'))) {
          finalPath = filePath.replace(/\.htm$/, '.html');
        } else {
          res.writeHead(404); res.end('Not Found: ' + reqPath); return;
        }
      }

      const ext = path.extname(finalPath).toLowerCase();
      const mime = MIME[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      fs.createReadStream(finalPath).pipe(res);
    });
  } catch (e) {
    res.writeHead(500); res.end('Server Error');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
