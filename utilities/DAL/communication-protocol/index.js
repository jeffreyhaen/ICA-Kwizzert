global.ChooseCategories = require("./chooseCategories.js");
global.GameInformation = require("./gameInformation.js");
global.GameStart = require("./gameStart.js");
global.GameStop = require("./gameStop.js");
global.InitializeGame = require("./initializeGame.js");
global.QuestionSelect = require("./questionSelect.js");
global.RateTeamAnswer = require("./rateTeamAnswer.js");
global.RateTeamRegistration = require("./rateTeamRegistration.js");
global.RegisterAnswer = require("./registerAnswer.js");
global.RegisterClient = require("./registerClient.js");
global.RegisterTeam = require("./registerTeam.js");
global.RequestTeamGameInformation = require("./requestTeamGameInformation.js");
global.ResponseTeamGameInformation = require("./responseTeamGameInformation.js");
global.RoundStart = require("./roundStart.js");
global.RoundStop = require("./roundStop.js");
// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
// require('fs').readdirSync(__dirname + '/').forEach(function(file) {
//   if (file.match(/\.js$/) !== null && file !== 'index.js') {
//     var name = capitalizeFirstLetter(file.replace('.js', ''));
//     global[name] = require('./' + file);
//   }
// });

// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }