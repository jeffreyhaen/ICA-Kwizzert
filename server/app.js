'use strict'

const app = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const { // Models...
    Game,
    Team,
} = require('../utilities/DAL/models/');

const { // Communication-protocol...
    RegisterClient, 
    RegisterTeam, 
    CreateGame, 
    RequestGameList, 
    ResponseGameList,
    RateTeamRegistration,
    RequestGameTeams,
    ResponseGameTeams,
    GameStart,
} = require('../utilities/DAL/communication-protocol/');

server.listen(3001, function() {
    console.log("Kwizzert server listening on port 3001!");
});

const events = [
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

/* Event handler for communication-protocol RegisterClient. */
function onRegisterClient(socket, data) {
    let client = { socket: socket, clientType: data.clientType }
    clients.push(client);
}

/* Event handler for communication-protocol RegisterTeam */
function onRegisterTeam(socket, data) {
    let game = games.find((item) => item.compareKey(data.gameId));

    if (game !== undefined) {
        let team = new Team(data.name);
        
        if (team.name !== undefined && game.teams.filter((item) => item.name === team.name).length === 0) {
            game.teams.push(team);
        }
    }
}

/* Event handler for communication-protocol CreateGame */
function onCreateGame(socket, data) {
    let newGame = new Game(data.name);
    
    if (newGame.name !== undefined && games.filter((item) => item.name === newGame.name).length === 0) {
        games.push(newGame);
    }
}

/* Event handler for communication-protocol RequestGameList */
function onRequestGameList(socket, data) {
    ////let gameIds = games.map((game) => { return game.getKey(); });
    let responseGameList = new ResponseGameList(games);
    
    socket.emit(responseGameList.type, responseGameList);
}

/* Event handler for communication-protocol RateTeamRegistration */
function onRateTeamRegistration(socket, data) {
    let game = games.find((item) => item.compareKey(data.gameId));

    if (game !== undefined) {
        let team = game.teams.find((item) => item.compareKey(data.teamId));

        if (team !== undefined) {
            team.accepted = data.accepted;
        }
    }
}

/* Event handler for communication-protocol RequestGameTeams */
function onRequestGameTeams(socket, data) {
    let game = games.find((item) => item.compareKey(data.gameId));

    if (game !== undefined) {
        let responseGameTeams = new ResponseGameTeams(game.getKey(), game.teams);
        socket.emit(responseGameTeams.type, responseGameTeams);
    }
}

/* Event handler for communication-protocol GameStart */
function onGameStart(socket, data) {
    let game = games.find((item) => item.compareKey(data.gameId));
    
    if (game !== undefined) {
        game.started = true;
    }
}