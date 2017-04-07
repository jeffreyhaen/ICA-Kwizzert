'use strict'

const app = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const constants = require("../utilities/DAL/constants");

const { // Models...
    Game,
    Round,
    Team,
    Category,
    Question,
    Answer,
} = require('../utilities/DAL/models/');

const { // Communication-protocol...
    RegisterClient,
    RegisterTeam,
    RegisterTeamAnswer,
    ChooseCategories,
    ChooseQuestion,
    RequestCategoryList,
    ResponseCategoryList,
    RequestGameList,
    ResponseGameList,
    RequestGameInformation,
    ResponseGameInformation,
    RequestRoundInformation,
    ResponseRoundInformation,
    ResponseTeamAnswer,
    RateTeamAnswer,
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
    { type: new RegisterTeamAnswer().type, handler: onRegisterTeamAnswer },
    { type: new ChooseCategories().type, handler: onChooseCategories },
    { type: new ChooseQuestion().type, handler: onChooseQuestion },
    { type: new RequestCategoryList().type, handler: onRequestCategoryList },
    { type: new RequestGameList().type, handler: onRequestGameList },
    { type: new RequestGameInformation().type, handler: onRequestGameInformation },
    { type: new RequestRoundInformation().type, handler: onRequestRoundInformation },
    { type: new RateTeamAnswer().type, handler: onRateTeamAnswer },
    { type: new RateTeamRegistration().type, handler: onRateTeamRegistration },
    { type: new CreateGame().type, handler: onCreateGame },
    { type: new GameStart().type, handler: onGameStart },
    { type: new GameStop().type, handler: onGameStop },
];

var games = [];     // See model Game. Example: { name: "Gametest 1", rounds: [], teams: [] }.
var clients = [];   // See communication-protocol RegisterClient. Example: { socket: mySocket, clientType: myClientType }.

io.on('connection', (client) => { // TODO: Authorisation for every app on every socket event.
    events.forEach((event, index) => {
        client.on(event.type, function(data) {
            console.log(`Event ${event.type} called by client ${client.id} (${clients.filter((item) => item.socket.id === client.id).map((item) => { return item.clientType; })}).`);
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

/* Event handler for communication-protocol RequestRoundInformation */
function onRequestRoundInformation(socket, data) {
    let game = games.find((item) => item.name === data.gameId);

    if (game !== undefined) {
        let round = game.rounds.find((item) => item.number === data.roundId);
        let responseRoundInformation = new ResponseRoundInformation(round);
        socket.emit(responseRoundInformation.type, responseRoundInformation);
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

/* Event handler for communication-protocol RateTeamAnswer */
function onRateTeamAnswer(socket, data) {
    // TODO: Implement...
}

/* Event handler for communication-protocol RequestCategoryList */
function onRequestCategoryList(socket, data) {
    let categories = [new Category('test-category-1'), new Category('test-category-2'), new Category('test-category-3'), new Category('test-category-4')]; // TODO: Implement database...
    let responseCategoryList = new ResponseCategoryList(categories);

    socket.emit(responseCategoryList.type, responseCategoryList);
}

/* Event handler for communication-protocol ChooseCategories */
function onChooseCategories(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    let categories = data.categoryIds.map((item) => { return new Category(item); }); // TODO: Get Categories from database.
    let questions = [new Question(categories[0], "test-vraag-1"), new Question(categories[1], "test-vraag-2"), new Question(categories[2], "test-vraag-3")]; // TODO: Get questions from database based on the categories...
    let round = new Round((game.rounds.length + 1), questions);

    game.rounds.push(round);
}

/* Event handler for communication-protocol ChooseQuestion */
function onChooseQuestion(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    let round = game.rounds.find((item) => item.number === data.roundId);
    let question = new Question(null, data.questionId); // TODO: Get question from the database.

    round.currentQuestion = question;

    let clientsToNotify = clients.filter((item) => item.clientType === constants.TEAM_APP ||  item.clientType === constants.SCOREBOARD_APP); // TODO: Filter on clients that are bound to the current game.
    clientsToNotify.forEach((item, index) => {
        //item.socket.emit(); // TODO: Create Response(NewQuestion).
    });
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

/* Event handler for communication-protocol RegisterTeamAnswer */
function onRegisterTeamAnswer(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    
    if (game !== undefined) {
        let team = game.teams.find((item) => item.name === data.teamId);

        if (team !== undefined) {
            let answer = new Answer(team, game.currentQuestion, data.value);
            let responseTeamAnswer = new ResponseTeamAnswer(answer);
            let clientsToNotify = clients.filter((item) => item.clientType === constants.KWIZMEESTERT_APP); // TODO: Filter on clients that are bound to the current game.
            
            // TODO: Save answer to somewhere?

            clientsToNotify.forEach((item, index) => {
                item.socket.emit(responseTeamAnswer.type, responseTeamAnswer);
            });
        }
    }
}