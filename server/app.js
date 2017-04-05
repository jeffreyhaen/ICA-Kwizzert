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
var RateTeamRegistration = require('../utilities/DAL/communication-protocol/rateTeamRegistration');
var RequestGameTeams = require('../utilities/DAL/communication-protocol/requestGameTeams');
var ResponseGameTeams = require('../utilities/DAL/communication-protocol/responseGameTeams');
var GameStart = require('../utilities/DAL/communication-protocol/gameStart');

server.listen(3001, function() {
    console.log("Kwizzert server listening on port 3001!");
});

var events = [
    { type: new RegisterClient().type, handler: onRegisterClient },
    { type: new RegisterTeam().type, handler: onRegisterTeam },
    { type: new CreateGame().type, handler: onCreateGame },
    { type: new RequestGameList().type, handler: onRequestGameList },
    { type: new RateTeamRegistration().type, handler: onRateTeamRegistration },
    { type: new RequestGameTeams().type, handler: onRequestGameTeams },
    { type: new GameStart().type, handler: onGameStart },
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
    let gameIds = games.map((game) => { return game.name; });
    let responseGameList = new ResponseGameList(gameIds);
    
    socket.emit(responseGameList.type, responseGameList);
}

/* Uses model RateTeamRegistration */
function onRateTeamRegistration(socket, data) {
    let game = games.find((item) => item.gameId === data.gameId);

    if (game !== undefined) {
        let team = game.teams.find((item) => item.teamId === data.teamId);

        if (team !== undefined) {
            team.accepted = data.accepted;
        }
    }
}

/* Uses model RequestGameTeams */
function onRequestGameTeams(socket, data) {
    let game = games.find((item) => item.gameId === data.gameId);
    let responseGameTeams = new ResponseGameTeams(game.id, game.teams);

    socket.emit(responseGameTeams.type, responseGameTeams);
}

/* Uses model GameStart */
function onGameStart(socket, data) {
    let game = games.find((item) => item.gameId === data.gameId);
    
    if (game !== undefined) {
        game.started = true;
    }
}