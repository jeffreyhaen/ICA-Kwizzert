
/* Used by clients to request information about the given team in the given game. 
   See class ResponseTeamGameInformation for the response. */
class RequestTeamInformation {
    constructor(gameId, teamId) {
        this.type = "RequestTeamInformation";
        this.gameId = gameId;
        this.teamId = teamId;
    }
}

module.exports = RequestTeamInformation;