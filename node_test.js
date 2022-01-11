// 変数 http で require()関数で http モジュールを読込
const http = require('http');
// 変数 fs に require()関数で fs モジュールを読込
const fs = require('fs');
// ルーティングを設定するために url モジュールを読込
const url = require('url');

// ルーティングのためにそれぞれのページを読込
const indexPage = fs.readFileSync('./html/index.html', 'utf-8');
const otherPage = fs.readFileSync('./html/other.html', 'utf-8');
const subPage = fs.readFileSync('./html/sub/index.html', 'utf-8');
const styleCss = fs.readFileSync('./html/css/style.css', 'utf-8');
const scriptJs = fs.readFileSync('./html/js/script.js', 'utf-8');

// 変数 hostname で ホスト名を設定。値は 127.0.0.1（注 これは自分自身という特別な値）
const hostname = '127.0.0.1';
// 変数 port でポート番号を設定。値は3000
const port = 3000;

// createServer()関数で中身を RouteSetting() に外部関数化する
const server = http.createServer(RouteSetting);

// server の listen()関数 を実行。第一引数は port、第二引数は hostname、第三引数は無名関数
// 無名関数の処理は console.log() で中身は Server running at http://${hostname}:${port}/
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//RouteSetting()関数の定義 URLとファイルを紐づけていく
function RouteSetting(req, res) {
  const url_parts = url.parse(req.url);
  switch (url_parts.pathname) {
    case '/':
    case '/index.html':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(indexPage);
      res.end()
      break;

    case '/other.html':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(otherPage);
      res.end();
      break;

    case '/sub/':
    case '/sub/index.html':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(subPage);
      res.end();
      break;

    case '/css/style.css':
      res.writeHead(200, {'Content-Type': 'Text/css'});
      res.write(styleCss);
      res.end();
      break;

    case '/js/script.js':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(scriptJs);
      res.end();
      break;

    default:
      res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end('入力さてたページは存在しない');
      break;
  }
}

/** ※RouteSetting()関数を使う方法に変更
// 変数 server で http の createServer()関数を 実行。引数は無名関数
// 無名関数の第一引数は req 、第二引数は res
const server = http.createServer((req, res) => {
  //fs の readFile()関数でファイルを読込。第一引数でファイル、第二引数に文字コード、第三引数にコールバック関数。
  fs.readFile('./html/index.html', 'UTF-8',
    (error, data) => {
      // resのwriteHeadメソットでヘッダ情報をレスポンスに書出す。第一引数にステータスコード、第二引数にヘッダー情報を連想配列で指定する。
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write(data);
      res.end();
    });
});

/** ※readFileSync関数()で外部の HTML を読み込む方法に変更
// res の statusCode を 200に設定
res.statusCode = 200;
// res の setHeader()関数 を実行。第一引数は Content-Type 、第二引数は text/plain および charset=utf-8
res.setHeader('Content-Type', 'text/html; charset=utf-8');
// res の write()関数 を実行。値に表示したい文字列を入れる
res.write('<!DOCTYPE HTML>');
res.write('<html>');
res.write('<head>');
res.write('<meta charset="utf-8">');
res.write('<title>こんにちは、のおど・じぇいえす。</title>');
res.write('</head>');
res.write('<body>');
res.write('<section>');
res.write('<h1>こんにちは、のおど・じぇいえす。</h1>');
res.write('<p>Node.jsでHTMLタグを作れるかのテストです。</p>');
res.write('</section>');
res.write('</body>');
res.write('</html>');
// res の end()関数 を実行
res.end();
});
*/