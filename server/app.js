'use strict'

const app = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const constants = require('../utilities/constants');
const mongo = require('mongodb').MongoClient;

const { // Models...
    Game,
    Round,
    Category,
    Question,
    PlayedQuestion,
    Team,
    TeamAnswer,
} = require('../utilities/DAL/models/');

const { // Communication-protocol...
    CreateGame,
    RegisterClient,
    RegisterToGame,
    RegisterTeam,
    RegisterTeamAnswer,
    RequestCategoryList,
    ResponseCategoryList,
    RequestGameList,
    ResponseGameList,
    RequestGameInformation,
    ResponseGameInformation,
    RequestRoundInformation,
    ResponseRoundInformation,
    RequestTeamInformation,
    ResponseTeamInformation,
    ResponseTeamAnswer,
    RateTeamAnswer,
    RateTeamRegistration,
    ChooseCategories,
    StartGame,
    StopGame,
    StopRound,
    StartQuestion,
    StopQuestion,
    CloseQuestion,
    RequestGameHistory,
    ResponseGameHistory,
} = require('../utilities/DAL/communication-protocol/');

let db;

mongo.connect(constants.MONGODB_CONNECTIONSTRING, function (err, database) {
    db = database;
    server.listen(constants.SERVER_PORT, function() {
        console.log(`Kwizzert server listening on port ${constants.SERVER_PORT}!`);
    });
});

const events = [
    { type: new CreateGame().type, handler: onCreateGame },
    { type: new RegisterClient().type, handler: onRegisterClient },
    { type: new RegisterToGame().type, handler: onRegisterToGame },
    { type: new RegisterTeam().type, handler: onRegisterTeam },
    { type: new RegisterTeamAnswer().type, handler: onRegisterTeamAnswer },
    { type: new RequestCategoryList().type, handler: onRequestCategoryList },
    { type: new RequestGameList().type, handler: onRequestGameList },
    { type: new RequestGameInformation().type, handler: onRequestGameInformation },
    { type: new RequestRoundInformation().type, handler: onRequestRoundInformation },
    { type: new RequestTeamInformation().type, handler: onRequestTeamInformation },
    { type: new RequestGameHistory().type, handler: onRequestGameHistory },
    { type: new RateTeamAnswer().type, handler: onRateTeamAnswer },
    { type: new RateTeamRegistration().type, handler: onRateTeamRegistration },
    { type: new ChooseCategories().type, handler: onChooseCategories },
    { type: new StartGame().type, handler: onStartGame },
    { type: new StopGame().type, handler: onStopGame },
    { type: new StopRound().type, handler: onStopRound },
    { type: new StartQuestion().type, handler: onStartQuestion },
    { type: new StopQuestion().type, handler: onStopQuestion },
    { type: new CloseQuestion().type, handler: onCloseQuestion },
];

let games = [];     // See model Game. Example: { name: "Gametest 1", rounds: [], teams: [] }.
let clients = [];   // See communication-protocol RegisterClient. Example: { socket: mySocket, clientType: myClientType, currentGame = myGame }.

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

/* Method to notify connected clients with the given message. The clients has to be bound to the given game and must meet the client type requirement. */
function notifyClientsFor(game, message, clientTypes) {
    let clientsToNotify = clients.filter((item) => item.currentGame !== null && item.currentGame.name === game.name && clientTypes.find((type) => type === item.clientType) !== undefined);

    clientsToNotify.forEach((item, index) => {
        item.socket.emit(message.type, message);
    });
}


/* ===== Common events ===== */

/* Event handler for communication-protocol RegisterClient. */
function onRegisterClient(socket, data) {
    let client = { socket: socket, clientType: data.clientType, currentGame: null }
    clients.push(client);
}

/* Event handler for communication-protocol RegisterToGame. */
function onRegisterToGame(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    let client = clients.find((item) => item.socket.id === socket.id);

    if (client !== undefined && game !== undefined) {
        client.currentGame = game;
    }
}


/* ===== KwizMeester-app events ===== */

/* Event handler for communication-protocol CreateGame. */
function onCreateGame(socket, data) {
    let newGame = new Game(data.name);
    
    if (newGame.name !== undefined && newGame.name !== "" && games.filter((item) => item.name === newGame.name).length === 0) {
        games.push(newGame);
    }
}

/* Event handler for communication-protocol RequestGameList. */
function onRequestGameList(socket, data) {
    let responseGameList = new ResponseGameList(games);
    socket.emit(responseGameList.type, responseGameList);
}

/* Event handler for communication-protocol RequestGameInformation. */
function onRequestGameInformation(socket, data) {
    let game = games.find((item) => item.name === data.gameId);

    if (game !== undefined) {
        let responseGameInformation = new ResponseGameInformation(game);
        socket.emit(responseGameInformation.type, responseGameInformation);
    }
}

/* Event handler for communication-protocol RequestRoundInformation. */
function onRequestRoundInformation(socket, data) {
    let game = games.find((item) => item.name === data.gameId);

    if (game !== undefined) {
        let round = game.rounds.find((item) => item.number === data.roundId);
        let responseRoundInformation = new ResponseRoundInformation(round);

        socket.emit(responseRoundInformation.type, responseRoundInformation);
    }
}

/* Event handler for communication-protocol RateTeamRegistration. */
function onRateTeamRegistration(socket, data) {
    let game = games.find((item) => item.name === data.gameId);

    if (game !== undefined) {
        let team = game.teams.find((item) => item.name === data.teamId);

        if (team !== undefined) {
            team.accepted = data.accepted;

            let responseGameInformation = new ResponseGameInformation(game);
            notifyClientsFor(game, responseGameInformation, [constants.SCOREBOARD_APP]);
        }
    }
}

/* Event handler for communication-protocol RateTeamAnswer. */
function onRateTeamAnswer(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    let round = game.rounds.find((item) => item.number === data.roundId);
    let teamAnswer = round.currentQuestion.teamAnswers.find((item) => item.team.name === data.teamId && item.question.value === data.questionId);

    teamAnswer.accepted = data.accepted;
}

/* Event handler for communication-protocol RequestCategoryList. */
function onRequestCategoryList(socket, data) {
     db.collection('questions').find().toArray(function (err, questions) {
        let categories = Array.from(new Set(questions.map((question) => { return question.category.name; }))).map((item) => { return new Category(item); });
        let responseCategoryList = new ResponseCategoryList(categories);

        socket.emit(responseCategoryList.type, responseCategoryList);
    });
}

/* Event handler for communication-protocol ChooseCategories. */
function onChooseCategories(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    let answeredQuestions = [];

    // Get already answered questions that has to be filtered.
    game.rounds.forEach((round) => { 
        round.answeredQuestions.forEach((answeredQuestion) => {
            answeredQuestions.push(answeredQuestion.question.value);
        });
    });

    db.collection('questions').find({ 'category.name': { $in: data.categoryIds } }).toArray(function(err, filteredQuestions) {
        let randomQuestions = filteredQuestions
            .filter((item) => answeredQuestions.find((answered) => answered === item.value) === undefined)
            .sort((item) => { return 0.5 - Math.random(); })
            .slice(0, constants.QUESTION_AMOUNT);
        let round = new Round((game.rounds.length + 1), randomQuestions);
        
        game.rounds.push(round);

        let responseRoundInformation = new ResponseRoundInformation(round);
        socket.emit(responseRoundInformation.type, responseRoundInformation);
    });
}

/* Event handler for communication-protocol StartQuestion. */
function onStartQuestion(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    let round = game.rounds.find((item) => item.number === data.roundId);

    db.collection('questions').findOne({ value: data.questionId }, function(err, filteredQuestion) {
        let question = new Question(new Category(filteredQuestion.category.name), filteredQuestion.value, filteredQuestion.answer);

        round.currentQuestion = new PlayedQuestion(question, true);

        let responseRoundInformation = new ResponseRoundInformation(round);
        notifyClientsFor(game, responseRoundInformation, [constants.TEAM_APP, constants.SCOREBOARD_APP]);
    });
}

/* Event handler for communication-protocol StopQuestion. */
function onStopQuestion(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    let round = game.rounds.find((item) => item.number === data.roundId);

    round.answeredQuestions.push(round.currentQuestion);
    round.currentQuestion = null;

    let responseRoundInformation = new ResponseRoundInformation(round);
    notifyClientsFor(game, responseRoundInformation, [constants.KWIZMEESTERT_APP, constants.TEAM_APP, constants.SCOREBOARD_APP]);
}

/* Event handler for communication-protocol CloseQuestion. */
function onCloseQuestion(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    let round = game.rounds.find((item) => item.number === data.roundId);

    round.currentQuestion.open = false;

    let responseRoundInformation = new ResponseRoundInformation(round);
    notifyClientsFor(game, responseRoundInformation, [constants.KWIZMEESTERT_APP, constants.TEAM_APP, constants.SCOREBOARD_APP]);
}

/* Event handler for communication-protocol StopRound. */
function onStopRound(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    let round = game.rounds.find((item) => item.number === data.roundId);
    let points = [];

    game.teams.forEach((team) => {
        let teamPoints = { team: team, correctAnswers: 0 };

        round.answeredQuestions.map((answeredQuestion) => {
            let answer = answeredQuestion.teamAnswers.filter((teamAnswer) => teamAnswer.team.name === team.name)[0];
            
            if (answer !== undefined && answer.accepted === true) {
                teamPoints.correctAnswers++;
            }
        });

        points.push(teamPoints);
    });

    let sortedPoints = points.sort((a, b) => a.correctAnswers > b.correctAnswers).reverse(); // Descending

    for (var index = 0; index < sortedPoints.length; index++) {
        if (index === 0) {
            sortedPoints[index].team.points += constants.POINTS_BEST;
        }
        else if (index === 1) {
            sortedPoints[index].team.points += constants.POINTS_SEMIBEST;
        }
        else {
            sortedPoints[index].team.points += constants.POINTS_REST;
        }
    }

    let responseGameInformation = new ResponseGameInformation(game);
    notifyClientsFor(game, responseGameInformation, [constants.SCOREBOARD_APP]);
}

/* Event handler for communication-protocol StartGame. */
function onStartGame(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    
    if (game !== undefined) {
        game.started = true;

        // Remove unaccepted teams from the game.
        game.teams.forEach((team) => {
            if (team.accepted === false) {
                var teamIndex = game.teams.indexOf(team);
                game.teams.splice(teamIndex, 1);
            }
        });

        let responseGameInformation = new ResponseGameInformation(game);
        notifyClientsFor(game, responseGameInformation, [constants.SCOREBOARD_APP]);
    }
}

/* Event handler for communication-protocol StopGame. */
function onStopGame(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    
    if (game !== undefined) {
        game.started = false;

        db.collection('games').insert(game); // Save game to the database for history.

        let responseGameInformation = new ResponseGameInformation(game);
        notifyClientsFor(game, responseGameInformation, [constants.SCOREBOARD_APP]);
    }
}

function onRequestGameHistory(socket) {
    db.collection('games').find({}).toArray((err, games) => {
        let responseGameHistory = new ResponseGameHistory(games);

        socket.emit(responseGameHistory.type, responseGameHistory);
    });
}


/* ===== Team-app events ===== */

/* Event handler for communication-protocol RegisterTeam. */
function onRegisterTeam(socket, data) {
    let game = games.find((item) => item.name === data.gameId);

    if (game !== undefined) {
        let team = new Team(data.name);
        
        if (team.name !== undefined && team.name !== "" && game.teams.filter((item) => item.name === team.name).length === 0) {
            game.teams.push(team);

            onRegisterToGame(socket, new RegisterToGame(game.name));

            let responseGameInformation = new ResponseGameInformation(game);
            notifyClientsFor(game, responseGameInformation, [constants.KWIZMEESTERT_APP]);
        }
    }
}

/* Event handler for communication-protocol RegisterTeamAnswer. */
function onRegisterTeamAnswer(socket, data) {
    let game = games.find((item) => item.name === data.gameId);

    if (game !== undefined) {
        let team = game.teams.find((item) => item.name === data.teamId);
        let round = game.rounds.find((item) => item.number === data.roundId);

        if (team !== undefined && round !== undefined && data.value !== "" && round.currentQuestion !== null && round.currentQuestion.open === true) {
            let existingAnswer = round.currentQuestion.teamAnswers.find((item) => item.team.name === team.name);
            
            if (existingAnswer === undefined) {
                let answer = new TeamAnswer(team, round.currentQuestion.question, data.value);
                round.currentQuestion.teamAnswers.push(answer);
            }
            else {
                existingAnswer.value = data.value;
            }

            let responseRoundInformation = new ResponseRoundInformation(round);
            notifyClientsFor(game, responseRoundInformation, [constants.KWIZMEESTERT_APP]);
        }
    }
}

/* Event handler for communication-protocol RequestTeamInformation. */
function onRequestTeamInformation(socket, data) {
    let game = games.find((item) => item.name === data.gameId);
    let team = game.teams.find((item) => item.name === data.teamId);
    let responseTeamInformation = new ResponseTeamInformation(team);

    socket.emit(responseTeamInformation.type, responseTeamInformation);
}