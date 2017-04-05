'use strict'

var app = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path    = require('path');

var RegisterClient = require('../utilities/DAL/communication-protocol/registerClient');
var RegisterTeam = require('../utilities/DAL/communication-protocol/registerTeam');

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
        clients = clients.filter((item) => item.socket.id !== client.id);
    });
});

/* Uses model RegisterClient. */
function onRegisterClient(socket, data) {
    var client = { socket: socket, clientType: data.clientType }
    clients.push(client);
}

function onRegisterTeam(socket, data) {
    // if(socket == clients.first(socket && type == "team")) {
    //     if (game.in(message.gameId))
    //     {
            
    //     }
    // }
}

function onChooseCategories(socket, data) {

}
