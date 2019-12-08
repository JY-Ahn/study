/* node 의 모듈들을 불러옵니다. */
const requestHandler = require('./request-handler.js')
const http = require('http');
const port = 3000;
const ip = '127.0.0.1';
const server = http.createServer(requestHandler);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);
module.exports = server;