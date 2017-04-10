let constants = require('../../utilities/constants');
let should = require('chai').should();
let io = require('socket.io-client');

let { RegisterClient, CreateGame, RequestGameList, ResponseGameList } = require('../../utilities/DAL/communication-protocol');

describe("async test with socket.io", function () {
this.timeout(10000);

it('Create game should succeed', function (done) {
    setTimeout(function () {
        let socket = io(constants.SERVER_ADDRESS, { forceNew: true }); 
        let registerClient = new RegisterClient(constants.KWIZMEESTERT_APP);
        let createGame = new CreateGame('test-game');
        let requestGameList = new RequestGameList();

        socket.on(new ResponseGameList().type, function (data) {
            should.exist(data);
            should.exist(data.games);

            data.games[0].should.include({ name: 'test-game' });

            socket.disconnect();
            done();
        });

        socket.emit(registerClient.type, registerClient);
        socket.emit(createGame.type, createGame);
        socket.emit(requestGameList.type, requestGameList);
        }, 4000);
    });
});