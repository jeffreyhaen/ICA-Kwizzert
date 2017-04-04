var app = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path    = require('path');

require('../utilities/DAL/communication-protocol');

server.listen(3000);

/*app.get('/', (request, response) => {
    // whaever
});*/

var lijst = {
    RegisterClient: onRegisterClient,
};

var games = [
    {
        gameId: "Game 1",
        teams: [{ type: "scoreboard", socket: SOCKET }, { type: "team", socket: SOCKET }]
    }
];

var clients = [
    { type: "scoreboard", socket: MOCKET }
]

io.on('connection', (client) => {
    client.on(RegisterClient.Type, function(data) {
        onRegisterClient(socket, data); 
    });


});

function onRegisterClient(socket, message) {
    console.log(from);
}

function onRegisterTeam(socket, message) {
    if(socket == clients.first(socket && type == "team")) {
        if (game.in(message.gameId))
        {
            
        }
    }
}


function onChooseCategories(from ,message) {

}



//theExpressApp.use(express.static(path.join(__dirname, 'client-side')));