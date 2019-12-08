

/*************************************************************

request handler 함수를 여기서 작성합니다.

reuqestHandler 함수는 이미 basic-server.js 파일에서 사용 했지만, 아직 작동하지 않습니다.

requestHandler 함수를 export 하여 basic-server.js 에서 사용 할 수 있게 하세요

**************************************************************/
const fs = require('fs');
const path = require('path');
const mimeType = {
  '.html' : 'text/html',
  '.css'  : 'text/css',
  '.js'   : 'text/javascript',
  '':'text/html'
}
let output = {
  results: []
};
fs.readFile('./text.json', 'utf8', function(err, data){
  if (err) {
    return;
  } else if (data.length > 0 && typeof(JSON.parse(data)) === 'object'){
    console.log(data);
    output = JSON.parse(data);
  }
});

const requestHandler =function(request, response){
  console.log(
    'Serving request type ' + request.method + ' for url ' + request.url
  );
  const statusCode = 200;
  const headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';

  if(request.url === '/classes/messages'){
    if(request.method === 'OPTIONS'){
      response.writeHead(statusCode, headers);
      response.end();
    }
    else if(request.method === 'POST'){
      let message ='';
      request.on('data', chunk =>{
        message += chunk;
      }).on('end', () => {
        message = JSON.parse(message);
        output.results.push(message);
        fs.writeFile('./text.json', JSON.stringify(output),'utf8', function(err){
          console.log('비동기적 파일 쓰기 완료');
          response.writeHead(201, headers);
          response.end();
        });
      })
    }
    else if(request.method === 'GET'){
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(output));
    }else{
      console.log('ERROR');
      response.writeHead(404, headers);
      response.end();
    }
  }
  else if(request.url === '/'){
    const filePath = path.join(__dirname, '../public/index.html') 
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      response.end(data)
    })
  }else if(request.url === '/codestates'){
    response.writeHead(404, headers);
    response.end();
  }
  else{
    console.log(request.url);
    const ext = path.parse(request.url).ext;
    const publicPath = path.join(__dirname, '../public');

    if(Object.keys(mimeType).includes(ext)){
      fs.readFile(`${publicPath}${request.url}`, (err, data) => {
        if(err){
          response.end('Not Found');
        }
        else{
          headers['Content-Type'] = mimeType[ext];
          response.writeHead(200, headers);
          response.end(data);
        }
      })
    }
  }
};

const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports = requestHandler;
