
/* Used to send back information about the given team in the given game to the client that requested the information. 
   See class RequestTeamGameInformation for the request. */
class ResponseTeamGameInformation {
    constructor(teamId, questionId, currentRound, rank, pointsNeededForRankUp) {
        this.type = "ResponseTeamGameInformation";
        this.teamId = teamId;
        this.questionId = questionId;
        this.currentRound = currentRound;
        this.rank = rank;
        this.pointsNeededForRankUp = pointsNeededForRankUp;
    }
}

module.exports = ResponseTeamGameInformation;