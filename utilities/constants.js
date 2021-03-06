
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
define('SERVER_ADDRESS', 'http://localhost:' + this.SERVER_PORT);

define('QUESTION_AMOUNT', 20);

define('ROUND_QUESTION_AMOUNT', 12);
define('CATEGORIES_AMOUNT', 3);

define('POINTS_BEST', 4);
define('POINTS_SEMIBEST', 2);
define('POINTS_REST', 0.1);