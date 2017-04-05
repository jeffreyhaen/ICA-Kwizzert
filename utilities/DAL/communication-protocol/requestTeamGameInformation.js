
/* Used by clients to request information about the given team in the given game. 
   See class ResponseTeamGameInformation for the response. */
class RequestTeamGameInformation {
    constructor(gameId, teamId) {
        this.type = "RequestTeamGameInformation";
        this.gameId = gameId;
        this.teamId = teamId;
    }
}

module.exports = RequestTeamGameInformation;