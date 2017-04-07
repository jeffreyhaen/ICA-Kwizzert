
function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("KWIZMEESTERT_APP", "KwizMeestert-app");
define("SCOREBOARD_APP", "Scoreboard-app");
define("TEAM_APP", "Team-app");