var express = require('express');
var http    = require('http');
var path    = require('path');
////var ws      = require('ws'); // TODO: Implement Socket.io.

var theExpressApp      = express();
var theHttpServer      = http.createServer();
//// var theWebSocketServer = new ws.Server({
////                             server: theHttpServer
////                          });

theExpressApp.use(express.static(path.join(__dirname, 'client-side')));


theHttpServer.on('request', theExpressApp);
theHttpServer.listen(3000, function() {
    console.log("The Server is lisening on port 3000.")
});
