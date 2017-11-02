/* Core modules */
/*
var fs = require('fs');
fs.writeFileSync('hw.txt', 'Hello world!!!');
var path = require('path');
*/

var http = require('http');

function onRequest(request, response){
    console.log("User made a request");
    response.writeHead(200, {"content-type": "text/plain"});
    response.write("I'm a response");
    response.end();
}


http.createServer(onRequest).listen(8888);
console.log("Server is runnig");













