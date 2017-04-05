'use strict'

var app = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path    = require('path');

var Game = require('../utilities/DAL/models/game');

var RegisterClient = require('../utilities/DAL/communication-protocol/registerClient');
var RegisterTeam = require('../utilities/DAL/communication-protocol/registerTeam');
var CreateGame = require('../utilities/DAL/communication-protocol/createGame');
var RequestGameList = require('../utilities/DAL/communication-protocol/requestGameList');
var ResponseGameList = require('../utilities/DAL/communication-protocol/responseGameList');

server.listen(3001, function() {
    console.log("Kwizzert server listening on port 3001!");
});

// var games = [
//     {
//         gameId: "Game 1",
//         teams: [{ type: "scoreboard", socket: SOCKET }, { type: "team", socket: SOCKET }]
//     }
// ];

var events = [
    { type: new RegisterClient().type, handler: onRegisterClient },
    { type: new RegisterTeam().type, handler: onRegisterTeam },
    { type: new CreateGame().type, handler: onCreateGame },
    { type: new RequestGameList().type, handler: onRequestGameList },
];

var games = [];     // See model Game. Example: { name: "Gametest 1", rounds: [], teams: [] }.
var clients = [];   // See communication-protocol RegisterClient. Example: { socket: mySocket, clientType: myClientType }.

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

/* Uses model CreateGame */
function onCreateGame(socket, data) {
    let newGame = new Game(data.name);
    
    if (newGame.name !== undefined && games.filter((game) => game.name === newGame.name).length === 0) {
        games.push(newGame);
    }
}

/* Uses model RequestGameList */
function onRequestGameList(socket, data) {
    let gameIds = games.map((game) => { return game.name; }).concat(['Test game 1', 'Test game 2']); // TODO: Get current available games.
    let responseGameList = new ResponseGameList();
    responseGameList.gameIds = gameIds;

    socket.emit(responseGameList.type, responseGameList);
}
