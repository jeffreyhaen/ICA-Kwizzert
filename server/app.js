'use strict'

const app = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const { // Models...
    Game,
    Team,
    Category,
} = require('../utilities/DAL/models/');

const { // Communication-protocol...
    RegisterClient, 
    RegisterTeam, 
    RequestCategoryList,
    ResponseCategoryList,
    RequestGameList, 
    ResponseGameList,
    RequestGameInformation,
    ResponseGameInformation,
    RateTeamRegistration,
    CreateGame, 
    GameStart,
    GameStop,
} = require('../utilities/DAL/communication-protocol/');

server.listen(3001, function() {
    console.log("Kwizzert server listening on port 3001!");
});

const events = [
    { type: new RegisterClient().type, handler: onRegisterClient },
    { type: new RegisterTeam().type, handler: onRegisterTeam },
    { type: new RequestCategoryList().type, handler: onRequestCategoryList },
    { type: new RequestGameList().type, handler: onRequestGameList },
    { type: new RequestGameInformation().type, handler: onRequestGameInformation },
    { type: new RateTeamRegistration().type, handler: onRateTeamRegistration },
    { type: new CreateGame().type, handler: onCreateGame },
    { type: new GameStart().type, handler: onGameStart },
    { type: new GameStop().type, handler: onGameStop },
];

var games = [];     // See model Game. Example: { name: "Gametest 1", rounds: [], teams: [] }.
var clients = [];   // See communication-protocol RegisterClient. Example: { socket: mySocket, clientType: myClientType }.

io.on('connection', (client) => {
    events.forEach((event, index) => {
        client.on(event.type, function(data) {
            console.log(`Event ${event.type} called by client ${client.id}.`);
            try { event.handler(client, data); }
            catch(error) { console.log(error); }
        });
    });

    client.on('disconnect', function () {
        console.log(`Client ${client.id} has been disconnected.`);
        clients = clients.filter((item) => item.socket.id !== client.id);
    });
});

/* ===== Common events ===== */

/* Event handler for communication-protocol RegisterClient. */
function onRegisterClient(socket, data) {
    let client = { socket: socket, clientType: data.clientType }
    clients.push(client);
}


/* ===== KwizMeester-app events ===== */

/* Event handler for communication-protocol CreateGame */
function onCreateGame(socket, data) {
    let newGame = new Game(data.name);
    
    if (newGame.name !== undefined && games.filter((item) => item.name === newGame.name).length === 0) {
        games.push(newGame);
    }
}

/* Event handler for communication-protocol RequestGameList */
function onRequestGameList(socket, data) {
    ////let gameIds = games.map((game) => { return game.name; });
    let responseGameList = new ResponseGameList(games);
    
    socket.emit(responseGameList.type, responseGameList);
}

/* Event handler for communication-protocol RequestGameInformation */
function onRequestGameInformation(socket, data) {
    let game = games.find((item) => item.name === data.gameId);

    if (game !== undefined) {
        let responseGameInformation = new ResponseGameInformation(game);
        socket.emit(responseGameInformation.type, responseGameInformation);
    }
}

/* Event handler for communication-protocol RateTeamRegistration */
function onRateTeamRegistration(socket, data) {
    let game = games.find((item) => item.name === data.gameId);

    if (game !== undefined) {
        let team = game.teams.find((item) => item.name === data.teamId);

        if (team !== undefined) {
            team.accepted = data.accepted;
        }
    }
}

/* Event handler for communication-protocol RequestCategoryList */
function onRequestCategoryList(socket, data) {
    let categories = [new Category('test-category-1'), new Category('test-category-2'), new Category('test-category-3'), new Category('test-category-4')]; // TODO: Implement database...
    let responseCategoryList = new ResponseCategoryList(categories);

    socket.emit(responseCategoryList.type, responseCategoryList);
}

/* Event handler for communication-protocol ChooseCategories */
function onRequestCategoryList(socket, data) {
    
}

/* Event handler for communication-protocol GameStart */
function onGameStart(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    
    if (game !== undefined) {
        game.started = true;
    }
}

/* Event handler for communication-protocol GameStop */
function onGameStop(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    
    if (game !== undefined) {
        game.started = false;
    }
}


/* ===== Team-app events ===== */

/* Event handler for communication-protocol RegisterTeam */
function onRegisterTeam(socket, data) {
    let game = games.find((item) => item.name === data.gameId);

    if (game !== undefined) {
        let team = new Team(data.name);
        
        if (team.name !== undefined && game.teams.filter((item) => item.name === team.name).length === 0) {
            game.teams.push(team);
        }
    }
}

/* Event handler for communication-protocol GameStop */
function onRegisterAnswer(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    
    if (game !== undefined) {
        let team = game.teams.find((item) => item.name === data.teamId);

        if (team !== undefined) {
            // TODO: Register answer for the current question. Implement current question first...
        }
    }
}