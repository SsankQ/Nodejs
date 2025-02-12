const http = require('http');
const cookie = require('cookie'); // 쿠키 모듈

http.createServer((request, response) => {

    let cookies = {}
    if (request.headers.cookie !== undefined) { // Set-Cookie가 선행되면 cookie값이 저장되는 장소
        cookies = cookie.parse(request.headers.cookie); // cookie값 객체화
    }
    // console.log(cookies.yummy_cookie);

    response.writeHead(200, {
        'Set-Cookie': [
            'yummy_cookie=choco',
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age=${60 * 60}`,
            'Secure=Secure; Secure',
            'HttpOnly=HttpOnly; HttpOnly',
            'Path=Path; Path=/cookie'
        ]
    })
    response.end('Cookie!!');
    console.log(`server listen on http://localhost:3000`)
}).listen(3000);

/*
 * 1. 클라이언트에서 특정 사이트 접속 => 사이트의 서버에서 일방적으로 쿠키를 응답 Header에 담아 전송
    Set-Cookie: 쿠키 생성해서 클라이언트에 쿠키 저장하게 해줌
   
 * 2. 새로고침 => 요청에다가 앞서 설정된 Cookie 값을 담아 서버로 전송(Application 탭에서 확인 가능)
 */

/*
 * Session 쿠키: 웹 브라우저를 종료하면 사라지는 휘발성 쿠키, 기간 옵션 설정하지 않음
 * Permanent 쿠키: 웹 브라우저를 꺼도 사라지지 않는 영속성 쿠키, Expires 또는 Max-Age를 설정
 ? 보안 options
 ? Secure: Set-Cookie로 Secure를 설정하면 해당 쿠키는 request Cookie에 저장되지 않음
 ? HttpOnly: 쿠키 탈취 방지를 위해 javaScript로는 쿠키에 접근할 수 없게 해주는 옵션
 * 기타 option
 * Path: 지정한 path에서만 쿠키 전송
 * Domain: 지정한 Domain에서만 쿠키 전송
 */

/*
 ? 로그인 (쿠키에 로그인 정보를 담는 것은 보안상 매우 위험하므로 전체 흐름만 파악할 것) => Session
 *1. 로그인 실행(버튼 등 UI로 구현)하면 Set-Cookie로 email(id), password 값을 저장
 *2. 로그인 여부를 확인(req.headers.cookie => cookie.parse)
 *   parse의 결과에 email, password 정보가 담겨있으면 로그인 상태 변화 isLogin=false => true
 *3. 로그인 상태에 따른 UI 조정

 ? 로그아웃
 * Set-Cookie로 email, password에 빈 값을 주고, Max-Age=0으로 설정 => 수명이 0이기에 쿠키가 바로 삭제됨
 */