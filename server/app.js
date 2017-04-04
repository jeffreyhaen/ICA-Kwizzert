'use strict'

var app = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path    = require('path');

require('../utilities/DAL/communication-protocol');

server.listen(3000, function() {
    console.log("Kwizzert server listening on port 3000!");
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

// var clients = [
//     { type: "scoreboard", socket: MOCKET }
// ]

var events = [
    { type: new RegisterClient().type, handler: onRegisterClient },
    { type: new RegisterTeam().type, handler: onRegisterTeam },
];

io.on('connection', (client) => {
    events.forEach((event, index) => {
        client.on(event.type, function(data) {
            console.log(`Event ${event.type} called by client ${client.id}.`);
            event.handler(client, data);
        });
    })
});

function onRegisterClient(socket, data) {
    console.log(socket.id);
    console.log(data);
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
