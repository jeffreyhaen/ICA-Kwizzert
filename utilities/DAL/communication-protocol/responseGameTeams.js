
class ResponseGameTeams {
    constructor(gameId, teams) {
        this.type = "ResponseGameTeams";
        this.gameId = gameId;
        this.teams = teams;
    }
}

module.exports = ResponseGameTeams;