const constants = require('../../utilities/constants');
const should = require('chai').should();
const io = require('socket.io-client');

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
} = require('../../utilities/DAL/communication-protocol/');

function createSocket() {
    return io(constants.SERVER_ADDRESS, { forceNew: true });
}

describe("Testing Kwizzert web socket server!", function () {
    this.timeout(10000);
    const timeoutPerTest = 2000;

    const gameName = 'test-game';
    const teamName = 'test-team';

    let currentRound = null;

    it('Create game should succeed', function (done) {
        setTimeout(function () {
            let socket = createSocket(); 
            let registerClient = new RegisterClient(constants.KWIZMEESTERT_APP);
            let createGame = new CreateGame(gameName);
            let requestGameList = new RequestGameList();

            socket.on(new ResponseGameList().type, function (data) {
                should.exist(data);
                should.exist(data.games);

                data.games[0].should.include({ name: gameName });

                socket.disconnect();
                done();
            });

            socket.emit(registerClient.type, registerClient);
            socket.emit(createGame.type, createGame);
            socket.emit(requestGameList.type, requestGameList);
        }, timeoutPerTest);
    });

    it('Register team should succeed', function (done) {
        setTimeout(function () {
            let socket = createSocket();
            let registerClient = new RegisterClient(constants.TEAM_APP);
            let registerTeam = new RegisterTeam(gameName, teamName);
            let requestTeamInformation = new RequestTeamInformation(gameName, teamName);

            socket.on(new ResponseTeamInformation().type, function (data) {
                should.exist(data);
                should.exist(data.team);

                data.team.should.include({ name: teamName, accepted: null });

                socket.disconnect();
                done();
            });

            socket.emit(registerClient.type, registerClient);
            socket.emit(registerTeam.type, registerTeam);
            socket.emit(requestTeamInformation.type, requestTeamInformation);
        }, timeoutPerTest);
    });

    it('Rate team registration should succeed', function (done) {
        setTimeout(function () {
            let socket = createSocket();
            let registerClient = new RegisterClient(constants.KWIZMEESTERT_APP);
            let rateTeamRegistration = new RateTeamRegistration(gameName, teamName, true);
            let requestTeamInformation = new RequestTeamInformation(gameName, teamName);

            socket.on(new ResponseTeamInformation().type, function (data) {
                should.exist(data);
                should.exist(data.team);

                data.team.should.include({ name: teamName, accepted: true });

                socket.disconnect();
                done();
            });

            socket.emit(registerClient.type, registerClient);
            socket.emit(rateTeamRegistration.type, rateTeamRegistration);
            socket.emit(requestTeamInformation.type, requestTeamInformation);
        }, timeoutPerTest);
    });

    it('Game should start and Scoreboard-app should receive a response', function (done) {
        setTimeout(function () {
            let socketScoreboardApp = createSocket();
            let socketKwizMeestertApp = createSocket();
            let registerClientScoreboardApp = new RegisterClient(constants.SCOREBOARD_APP);
            let registerClientKwizMeestertApp = new RegisterClient(constants.KWIZMEESTERT_APP);
            let registerToGame = new RegisterToGame(gameName);
            let startGame = new StartGame(gameName);

            socketScoreboardApp.on(new ResponseGameInformation().type, function (data) {
                should.exist(data);
                should.exist(data.game);

                data.game.should.include({ started: true });
                
                socketKwizMeestertApp.disconnect();
                socketScoreboardApp.disconnect();
                done();
            });

            socketScoreboardApp.emit(registerClientScoreboardApp.type, registerClientScoreboardApp);
            socketScoreboardApp.emit(registerToGame.type, registerToGame);
            socketKwizMeestertApp.emit(registerClientKwizMeestertApp.type, registerClientKwizMeestertApp);
            socketKwizMeestertApp.emit(startGame.type, startGame);
        }, timeoutPerTest);
    });

    it('Choose categories should succeed', function (done) {
        setTimeout(function () {
            let socket = createSocket();
            let registerClient = new RegisterClient(constants.KWIZMEESTERT_APP);
            let chooseCategories = new ChooseCategories(gameName, ['Algemeen']);

            socket.on(new ResponseRoundInformation().type, function (data) {
                should.exist(data);
                should.exist(data.round);

                data.round.should.include({ number: 1, currentQuestion: null });
                data.round.questions.length.should.equal(constants.QUESTION_AMOUNT);
                data.round.answeredQuestions.length.should.equal(0);
                
                currentRound = data.round;

                socket.disconnect();
                done();
            });

            socket.emit(registerClient.type, registerClient);
            socket.emit(chooseCategories.type, chooseCategories);
        }, timeoutPerTest);
    });

    it('Start question should succeed and Scoreboard-app and Team-app should receive a response', function (done) {
        setTimeout(function () {
            let socketScoreboardApp = createSocket();
            let socketKwizMeestertApp = createSocket();
            let socketTeamApp = createSocket();
            let registerClientScoreboardApp = new RegisterClient(constants.SCOREBOARD_APP);
            let registerClientKwizMeestertApp = new RegisterClient(constants.KWIZMEESTERT_APP);
            let registerClientTeamApp = new RegisterClient(constants.TEAM_APP);
            let registerToGame = new RegisterToGame(gameName);
            let startQuestion = new StartQuestion(gameName, currentRound.number, currentRound.questions[0].value);

            let doneCount = 0;
            let checkDone = function(round) {
                doneCount++;
                if (doneCount === 2) {
                    currentRound = round;
                    socketKwizMeestertApp.disconnect();
                    done();
                }
            };

            socketScoreboardApp.on(new ResponseRoundInformation().type, function (data) {
                should.exist(data);

                data.round.currentQuestion.question.value.should.equal(currentRound.questions[0].value);

                socketScoreboardApp.disconnect();
                checkDone(data.round);
            });

            socketTeamApp.on(new ResponseRoundInformation().type, function (data) {
                should.exist(data);

                data.round.currentQuestion.question.value.should.equal(currentRound.questions[0].value);

                socketTeamApp.disconnect();
                checkDone(data.round);
            });

            socketScoreboardApp.emit(registerClientScoreboardApp.type, registerClientScoreboardApp);
            socketScoreboardApp.emit(registerToGame.type, registerToGame);
            socketTeamApp.emit(registerClientTeamApp.type, registerClientTeamApp);
            socketTeamApp.emit(registerToGame.type, registerToGame);
            socketKwizMeestertApp.emit(registerClientKwizMeestertApp.type, registerClientKwizMeestertApp);
            socketKwizMeestertApp.emit(startQuestion.type, startQuestion);
        }, timeoutPerTest);
    });

    it('Register team answer should succeed', function (done) {
        setTimeout(function () {
            let socketKwizMeestertApp = createSocket();
            let socketTeamApp = createSocket();
            let registerClientKwizMeestertApp = new RegisterClient(constants.KWIZMEESTERT_APP);
            let registerClientTeamApp = new RegisterClient(constants.TEAM_APP);
            let registerToGame = new RegisterToGame(gameName);
            let registerTeamAnswer = new RegisterTeamAnswer(gameName, currentRound.number, teamName, currentRound.currentQuestion.question.value, 'test-team-answer');

            socketKwizMeestertApp.on(new ResponseRoundInformation().type, function (data) {
                should.exist(data);

                data.round.currentQuestion.teamAnswers[0].value.should.equal('test-team-answer');
                currentRound = data.round;

                socketTeamApp.disconnect();
                socketKwizMeestertApp.disconnect();
                done();
            });

            socketKwizMeestertApp.emit(registerClientKwizMeestertApp.type, registerClientKwizMeestertApp);
            socketKwizMeestertApp.emit(registerToGame.type, registerToGame);
            socketTeamApp.emit(registerClientTeamApp.type, registerClientTeamApp);
            socketTeamApp.emit(registerToGame.type, registerToGame);  
            socketTeamApp.emit(registerTeamAnswer.type, registerTeamAnswer);        
        }, timeoutPerTest);
    });

    it('Rate team answer should succeed', function (done) {
        setTimeout(function () {
            let socket = createSocket();
            let registerClient = new RegisterClient(constants.KWIZMEESTERT_APP);
            let registerToGame = new RegisterToGame(gameName);
            let rateTeamAnswer = new RateTeamAnswer(gameName, currentRound.number, teamName, currentRound.currentQuestion.question.value, true);
            let requestRoundInformation = new RequestRoundInformation(gameName, currentRound.number);

            socket.on(new ResponseRoundInformation().type, function (data) {
                should.exist(data);
                should.exist(data.round);

                data.round.currentQuestion.teamAnswers[0].accepted.should.equal(true);
                currentRound = data.round;

                socket.disconnect();
                done();
            });

            socket.emit(registerClient.type, registerClient);
            socket.emit(registerToGame.type, registerToGame);
            socket.emit(rateTeamAnswer.type, rateTeamAnswer);
            socket.emit(requestRoundInformation.type, requestRoundInformation);
        }, timeoutPerTest);
    });

    it('Stop question should succeed', function (done) {
        setTimeout(function () {
            let socketScoreboardApp = createSocket();
            let socketKwizMeestertApp = createSocket();
            let socketTeamApp = createSocket();
            let registerClientScoreboardApp = new RegisterClient(constants.SCOREBOARD_APP);
            let registerClientKwizMeestertApp = new RegisterClient(constants.KWIZMEESTERT_APP);
            let registerClientTeamApp = new RegisterClient(constants.TEAM_APP);
            let registerToGame = new RegisterToGame(gameName);
            let stopQuestion = new StopQuestion(gameName, currentRound.number);

            let doneCount = 0;
            let checkDone = function(round) {
                doneCount++;
                if (doneCount === 2) {
                    currentRound = round;
                    socketKwizMeestertApp.disconnect();
                    done();
                }
            };

            socketScoreboardApp.on(new ResponseRoundInformation().type, function (data) {
                should.exist(data);

                data.round.should.include({ currentQuestion: null });

                socketScoreboardApp.disconnect();
                checkDone(data.round);
            });

            socketTeamApp.on(new ResponseRoundInformation().type, function (data) {
                should.exist(data);
                
                data.round.should.include({ currentQuestion: null });

                socketTeamApp.disconnect();
                checkDone(data.round);
            });

            socketTeamApp.emit(registerClientTeamApp.type, registerClientTeamApp);
            socketTeamApp.emit(registerToGame.type, registerToGame);
            socketScoreboardApp.emit(registerClientScoreboardApp.type, registerClientScoreboardApp);
            socketScoreboardApp.emit(registerToGame.type, registerToGame);          
            socketKwizMeestertApp.emit(registerClientKwizMeestertApp.type, registerClientKwizMeestertApp);
            socketKwizMeestertApp.emit(stopQuestion.type, stopQuestion);
        }, timeoutPerTest);
    });

    it('Stop round should succeed, Scoreboard-app should receive a response and teams should get points', function (done) {
        setTimeout(function () {
            let socketScoreboardApp = createSocket();
            let socketKwizMeestertApp = createSocket();
            let registerClientScoreboardApp = new RegisterClient(constants.SCOREBOARD_APP);
            let registerClientKwizMeestertApp = new RegisterClient(constants.KWIZMEESTERT_APP);
            let registerToGame = new RegisterToGame(gameName);
            let stopRound = new StopRound(gameName, currentRound.number);

            socketScoreboardApp.on(new ResponseGameInformation().type, function (data) {
                should.exist(data);
                should.exist(data.game);

                data.game.teams.find((team) => team.name === teamName).points.should.equal(4);
                
                socketKwizMeestertApp.disconnect();
                socketScoreboardApp.disconnect();
                done();
            });

            socketScoreboardApp.emit(registerClientScoreboardApp.type, registerClientScoreboardApp);
            socketScoreboardApp.emit(registerToGame.type, registerToGame);
            socketKwizMeestertApp.emit(registerClientKwizMeestertApp.type, registerClientKwizMeestertApp);
            socketKwizMeestertApp.emit(stopRound.type, stopRound);
        }, timeoutPerTest);
    });
});

//    it(' should succeed', function (done) {
//         setTimeout(function () {
//             let socket = createSocket();
//             let registerClient = new RegisterClient(constants.KWIZMEESTERT_APP);
//             let  = new ();

//             socket.on(new ().type, function (data) {
//                 should.exist(data);

//                 socket.disconnect();
//                 done();
//             });

//             socket.emit(registerClient.type, registerClient);
//             socket.emit(.type, );
//             socket.emit(.type, );
//         }, timeoutPerTest);
//     });