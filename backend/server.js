const http = require('http')
const PORT = process.env.PORT || 8080
// var fs = require('fs')
// var path = require('path')

http.createServer(function (request, response) {
    console.log('request ', request.url);
    // fs.readFile(filePath, function(error, content) {
    //     if (error) {
    //         if(error.code == 'ENOENT'){
    //             fs.readFile('./404.html', function(error, content) {
    //                 response.writeHead(200, { 'Content-Type': contentType });
    //                 response.end(content, 'utf-8');
    //             });
    //         }
    //         else {
    //             response.writeHead(500);
    //             response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
    //             response.end();
    //         }
    //     }
    //     else {
    //         response.writeHead(200, { 'Content-Type': contentType });
    //         response.end(content, 'utf-8');
    //     }
    // });
}).listen(PORT)

console.log('server running at port:', PORT)
