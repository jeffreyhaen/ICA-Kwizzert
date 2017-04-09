
/* Used to rate an answer put by a team (approve or disapprove). */
class RateTeamAnswer {
    constructor(gameId, roundId, teamId, questionId, accepted) {
        this.type = "RateTeamAnswer";
        this.gameId = gameId;
        this.roundId = roundId;
        this.teamId = teamId;
        this.questionId = questionId;
        this.accepted = accepted;
    }
}

module.exports = RateTeamAnswer;