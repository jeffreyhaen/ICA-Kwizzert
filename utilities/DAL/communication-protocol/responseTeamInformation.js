
/* Used to send back information about the given team in the given game to the client that requested the information. 
   See class RequestTeamInformation for the request. */
class ResponseTeamInformation {
    constructor(team) {
        this.type = "ResponseTeamInformation";
        this.team = team;
    }
}

module.exports = ResponseTeamInformation;