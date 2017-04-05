
/* Used to send back available teams in the given game to the client that requested the list.
   See class RequestGameTeams for the request. */
class ResponseGameTeams {
    constructor(gameId, teams) {
        this.type = "ResponseGameTeams";
        this.gameId = gameId;
        this.teams = teams;
    }
}

module.exports = ResponseGameTeams;