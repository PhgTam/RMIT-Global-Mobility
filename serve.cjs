const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { handleFaq } = require('./faq-server.cjs');
const extensions = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png',
  '.json':'application/json; charset=utf-8'
};
const host = '127.0.0.1';
const port = Number(process.env.RMIT_PREVIEW_PORT || 4177);
http.createServer((req,res) => {
  let file;
  try {
    const requestPath = decodeURIComponent(new URL(req.url,'http://'+host).pathname);
    if (requestPath === '/api/faq') {
      handleFaq(req,res).catch(() => {
        if (!res.headersSent && !res.destroyed) res.writeHead(400).end();
      });
      return;
    }
    file = path.resolve(__dirname,'.'+(requestPath === '/' ? '/index.html' : requestPath));
  } catch { res.writeHead(400).end(); return; }
  const type = extensions[path.extname(file)];
  if (!file.startsWith(__dirname+path.sep) || !type || !fs.existsSync(file)) {
    res.writeHead(404).end(); return;
  }
  res.writeHead(200,{'content-type':type});
  fs.createReadStream(file).pipe(res);
}).listen(port,host,() => console.log('http://'+host+':'+port+'/'));

