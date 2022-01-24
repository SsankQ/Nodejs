const http = require('http');
const cookie = require('cookie'); // 쿠키 모듈

http.createServer((request, response) => {

    let cookies = {}
    if (request.headers.cookie !== undefined) { // Set-Cookie가 선행되면 cookie값이 저장되는 장소
        cookies = cookie.parse(request.headers.cookie); // cookie값 객체화
    }
    console.log(cookies.yummy_cookie);

    response.writeHead(200, {
        'Set-Cookie': ['yummy_cookie=choco', 'tasty_cookie=strawberry']
    })
    response.end('Cookie!!');
}).listen(3000);

/*
1. 클라이언트에서 특정 사이트 접속 => 사이트의 서버에서 일방적으로 쿠키를 응답 Header에 담아 전송
   Set-Cookie: 쿠키 생성해서 클라이언트에 쿠키 저장하게 해줌
   
2. 새로고침 => 요청에다가 앞서 설정된 Cookie 값을 담아 서버로 전송(Application 탭에서 확인 가능)
*/

// 쿠키에 SessionID => value / 언어 정보 등 다양한 정보가 저장 => 보안 사고에 유의 