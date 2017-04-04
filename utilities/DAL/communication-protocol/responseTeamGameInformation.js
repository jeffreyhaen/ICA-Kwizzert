
class ResponseTeamGameInformation {
    constructor(teamId, questionId, currentRound, maximumRounds, rank, pointsNeededForRankUp) {
        this.type = "ResponseTeamGameInformation";
        this.teamId = teamId;
        this.questionId = questionId;
        this.currentRound = currentRound;
        this.maximumRounds = maximumRounds;
        this.rank = rank;
        this.pointsNeededForRankUp = pointsNeededForRankUp;
    }
}

module.exports = ResponseTeamGameInformation;