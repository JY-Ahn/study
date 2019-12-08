const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;
// request 의 body를 읽어오기 위한 패키지
const bodyParser = require('body-parser');

const corsOptions = {
  'optionSuccessStatus' : 200,
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
}

// 데이터 보관 => 계속 초기화 돼서 메시지를 출력할 수 없다.
let output = {
  results: []
};
//text.json 파일이 비어있을 때와, 데이터를 가지고 있을 때를 구분한다.
fs.readFile('./text.json', 'utf8', function(err, data){
  if (err) {
    return;
  } else if (data.length > 0 && typeof(JSON.parse(data)) === 'object'){
    // 이미 데이터를 가지고 있으면 output에 덮어씌운다
    output = JSON.parse(data);
  }
});

// cors 대응

app.use(cors(corsOptions));
// static 파일폴더를 지정해준다
app.use(express.static('public'))
//request의 body에 접근할 수 있다.
app.use(bodyParser.json());

// options 메서드가 왔을 때에 대한 응답
app.options((request, response) => {
  console.log(request.method);
  response.send(cors(defaultCorsHeaders));
});
// 모든 요청에 대해서 콘솔 띄우기
app.use((request, response, next) => {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  next();
});
app.get('/', (request, response) => {
  const publicPath = path.join(__dirname, '../public/index.html');
  response.sendFile(publicPath);
});
app.get('/css/style.css', (request, response) => {
  const publicPath = path.join(__dirname, '../public/css/style.css');
  response.sendFile(publicPath);
});
app.get('/js/script.js', (request, response) => {
  const publicPath = path.join(__dirname, '../public/js/script.js');
  response.sendFile(publicPath);
});
// '/classes/messages' 로 get 요청이 들어오면  outout보내기
app.get('/classes/messages', (request, response, next) => {
    fs.readFile('./text.json', 'utf8', function(err, data){
        if (err){
          return;
        } else if (data.length > 0 && typeof(JSON.parse(data)) === 'object'){
          output = JSON.parse(data);
        }
        response.send(output);
    });
});

// '/classes/messages' 로 post 요청이 들어오면 fs에 write
app.post('/classes/messages', (request, response) => {
  output.results.push(request.body);
  fs.writeFile('./text.json', JSON.stringify(output),'utf8', function(err){
    if(err) throw err;
    console.log('비동기적 파일 쓰기 완료');
    response.send();
  });

});

app.listen(PORT, function(){
  console.log(`server listen on ${PORT}`);
})

const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};