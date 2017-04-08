
function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define('KWIZMEESTERT_APP', 'KwizMeestert-app');
define('SCOREBOARD_APP', 'Scoreboard-app');
define('TEAM_APP', 'Team-app');

define('MONGODB_CONNECTIONSTRING', 'mongodb://localhost/kwizzert');
define('SERVER_PORT', 3001);

define('QUESTION_AMOUNT', 20);