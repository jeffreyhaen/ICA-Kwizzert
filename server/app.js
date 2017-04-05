'use strict'

var app = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path    = require('path');

var RegisterClient = require('../utilities/DAL/communication-protocol/registerClient');
var RegisterTeam = require('../utilities/DAL/communication-protocol/registerTeam');
var RequestGameList = require('../utilities/DAL/communication-protocol/requestGameList');
var ResponseGameList = require('../utilities/DAL/communication-protocol/responseGameList');


server.listen(3001, function() {
    console.log("Kwizzert server listening on port 3001!");
});

/*app.get('/', (request, response) => {
    // whaever
});*/

// var lijst = {
//     RegisterClient: onRegisterClient,
// };

// var games = [
//     {
//         gameId: "Game 1",
//         teams: [{ type: "scoreboard", socket: SOCKET }, { type: "team", socket: SOCKET }]
//     }
// ];

var events = [
    { type: new RegisterClient().type, handler: onRegisterClient },
    { type: new RegisterTeam().type, handler: onRegisterTeam },
    { type: new onRequestGameList().type, handler: onRequestGameList },
];

var clients = []; // { socket: mySocket, clientType: myClientType } // See model RegisterClient.

io.on('connection', (client) => {
    events.forEach((event, index) => {
        client.on(event.type, function(data) {
            console.log(`Event ${event.type} called by client ${client.id}.`);
            event.handler(client, data);
        });
    });

    client.on('disconnect', function () {
        console.log(`Client ${client.id} has been disconnected.`);
        clients = clients.filter((item) => item.socket.id !== client.id);
    });
});

/* Uses model RegisterClient. */
function onRegisterClient(socket, data) {
    let client = { socket: socket, clientType: data.clientType }
    clients.push(client);
}

/* Uses model RegisterTeam */
function onRegisterTeam(socket, data) {
    // if(socket == clients.first(socket && type == "team")) {
    //     if (game.in(message.gameId))
    //     {
            
    //     }
    // }
}

/* Uses model RequestGameList */
function onRequestGameList(socket, data) {
    let gameIds = ['Test game 1', 'Test game 2']; // TODO: Get current available games.
    let responseGameList = new ResponseGameList();
    responseGameList.gameIds = gameIds;

    socket.emit(responseGameList.type, responseGameList);
}
