
class RequestTeamGameInformation {
    constructor(gameId, teamId) {
        this.type = "RequestTeamGameInformation";
        this.gameId = gameId;
        this.teamId = teamId;
    }
}

module.exports = RequestTeamGameInformation;